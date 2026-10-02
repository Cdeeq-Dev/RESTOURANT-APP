import { prisma } from '../lib/prisma';
import { CreateOrderInput } from '../schemas/orderSchema';
import { generateOrderNumber } from '../utils/orderNumber';

export interface CustomOrderError extends Error {
  statusCode?: number;
}

export const createOrder = async (input: CreateOrderInput) => {
  // Extract unique menu item IDs from input
  const menuItemIds = Array.from(new Set(input.items.map((item) => item.menuItemId)));

  // Fetch menu items from database
  const menuItems = await prisma.menuItem.findMany({
    where: {
      id: { in: menuItemIds },
    },
  });

  const menuItemMap = new Map(menuItems.map((item) => [item.id, item]));

  // Validate existence and availability for every item requested
  for (const itemInput of input.items) {
    const dbItem = menuItemMap.get(itemInput.menuItemId);

    if (!dbItem) {
      const error: CustomOrderError = new Error(`Menu item not found with ID: ${itemInput.menuItemId}`);
      error.statusCode = 404;
      throw error;
    }

    if (!dbItem.isAvailable) {
      const error: CustomOrderError = new Error(`Menu item '${dbItem.name}' is currently unavailable`);
      error.statusCode = 400;
      throw error;
    }
  }

  // Calculate total amount strictly using DB integer prices (in kobo)
  let totalAmount = 0;
  const orderItemsData = input.items.map((itemInput) => {
    const dbItem = menuItemMap.get(itemInput.menuItemId)!;
    const unitPrice = dbItem.price; // integer KOBO from database
    const subtotal = unitPrice * itemInput.quantity; // integer multiplication
    totalAmount += subtotal;

    return {
      menuItemId: dbItem.id,
      name: dbItem.name, // historical snapshot of name
      unitPrice: unitPrice, // historical snapshot of unit price
      quantity: itemInput.quantity,
      specialInstructions: itemInput.specialInstructions || null,
    };
  });

  // Attempt creation with unique orderNumber (with collision retry protection)
  let attempts = 0;
  while (attempts < 3) {
    try {
      const orderNumber = generateOrderNumber();

      // Transactional creation via nested create
      const order = await prisma.order.create({
        data: {
          orderNumber,
          customerName: input.customerName,
          phone: input.phone,
          orderType: input.orderType,
          roomNumber: input.orderType === 'ROOM_DELIVERY' ? input.roomNumber : null,
          specialInstructions: input.specialInstructions || null,
          totalAmount,
          items: {
            create: orderItemsData,
          },
        },
        select: {
          id: true,
          orderNumber: true,
          customerName: true,
          roomNumber: true,
          orderType: true,
          status: true,
          totalAmount: true,
          createdAt: true,
          items: {
            select: {
              id: true,
              menuItemId: true,
              name: true,
              unitPrice: true,
              quantity: true,
              specialInstructions: true,
            },
          },
        },
      });

      return order;
    } catch (error: any) {
      // Prisma error code P2002 indicates unique constraint violation
      if (error.code === 'P2002' && error.meta?.target?.includes('orderNumber')) {
        attempts++;
        if (attempts >= 3) throw error;
      } else {
        throw error;
      }
    }
  }

  throw new Error('Failed to generate unique order number after multiple attempts');
};

export const getOrderByOrderNumber = async (orderNumber: string) => {
  return prisma.order.findUnique({
    where: { orderNumber },
    select: {
      orderNumber: true,
      customerName: true,
      roomNumber: true,
      orderType: true,
      status: true,
      totalAmount: true,
      createdAt: true,
      items: {
        select: {
          id: true,
          menuItemId: true,
          name: true,
          unitPrice: true,
          quantity: true,
          specialInstructions: true,
        },
      },
    },
  });
};
