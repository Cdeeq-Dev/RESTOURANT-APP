import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const API_BASE = 'http://localhost:5000/api';

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  errors?: any;
}

async function runTests() {
  console.log('🧪 Starting Step 06B Verification Tests (A-N)...\n');

  // Fetch real menu items from DB
  const availableItems = await prisma.menuItem.findMany({
    where: { isAvailable: true },
    take: 2,
  });

  if (availableItems.length < 2) {
    console.error('❌ Not enough menu items found in DB for testing.');
    process.exit(1);
  }

  const item1 = availableItems[0];
  const item2 = availableItems[1];

  console.log(`Using DB Menu Items:
  - Item 1: "${item1.name}" (${item1.id}) @ ${item1.price} kobo
  - Item 2: "${item2.name}" (${item2.id}) @ ${item2.price} kobo\n`);

  let createdOrderNumber = '';

  // -------------------------------------------------------------
  // Test A: Valid ROOM_DELIVERY order -> Expected 201
  // -------------------------------------------------------------
  console.log('--- Test A: Valid ROOM_DELIVERY order ---');
  const resA = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Abubakar',
      roomNumber: '204',
      phone: '08012345678',
      orderType: 'ROOM_DELIVERY',
      specialInstructions: 'Please bring extra tissue',
      items: [
        { menuItemId: item1.id, quantity: 2, specialInstructions: 'No pepper' },
        { menuItemId: item2.id, quantity: 1 },
      ],
    }),
  });
  const dataA = (await resA.json()) as ApiResponse;
  console.log(`Status: ${resA.status}`);
  console.log('Response:', JSON.stringify(dataA, null, 2));
  if (resA.status === 201 && dataA.success && dataA.data?.orderNumber) {
    createdOrderNumber = dataA.data.orderNumber;
    console.log('✅ Test A PASSED\n');
  } else {
    console.error('❌ Test A FAILED\n');
  }

  // -------------------------------------------------------------
  // Test B: Valid TAKEOUT order without roomNumber -> Expected 201
  // -------------------------------------------------------------
  console.log('--- Test B: Valid TAKEOUT order without roomNumber ---');
  const resB = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Chidi',
      phone: '08098765432',
      orderType: 'TAKEOUT',
      items: [{ menuItemId: item1.id, quantity: 1 }],
    }),
  });
  const dataB = (await resB.json()) as ApiResponse;
  console.log(`Status: ${resB.status}`);
  console.log('Response:', JSON.stringify(dataB, null, 2));
  if (resB.status === 201 && dataB.success) {
    console.log('✅ Test B PASSED\n');
  } else {
    console.error('❌ Test B FAILED\n');
  }

  // -------------------------------------------------------------
  // Test C: ROOM_DELIVERY without roomNumber -> Expected 400
  // -------------------------------------------------------------
  console.log('--- Test C: ROOM_DELIVERY without roomNumber ---');
  const resC = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Fatima',
      phone: '08011112222',
      orderType: 'ROOM_DELIVERY',
      items: [{ menuItemId: item1.id, quantity: 1 }],
    }),
  });
  const dataC = (await resC.json()) as ApiResponse;
  console.log(`Status: ${resC.status}`);
  console.log('Response:', JSON.stringify(dataC, null, 2));
  if (resC.status === 400 && !dataC.success) {
    console.log('✅ Test C PASSED\n');
  } else {
    console.error('❌ Test C FAILED\n');
  }

  // -------------------------------------------------------------
  // Test D: Empty items array -> Expected 400
  // -------------------------------------------------------------
  console.log('--- Test D: Empty items array ---');
  const resD = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Emeka',
      roomNumber: '101',
      phone: '08033334444',
      orderType: 'ROOM_DELIVERY',
      items: [],
    }),
  });
  const dataD = (await resD.json()) as ApiResponse;
  console.log(`Status: ${resD.status}`);
  console.log('Response:', JSON.stringify(dataD, null, 2));
  if (resD.status === 400 && !dataD.success) {
    console.log('✅ Test D PASSED\n');
  } else {
    console.error('❌ Test D FAILED\n');
  }

  // -------------------------------------------------------------
  // Test E: quantity = 0 -> Expected 400
  // -------------------------------------------------------------
  console.log('--- Test E: quantity = 0 ---');
  const resE = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Amina',
      roomNumber: '102',
      phone: '08055556666',
      orderType: 'ROOM_DELIVERY',
      items: [{ menuItemId: item1.id, quantity: 0 }],
    }),
  });
  const dataE = (await resE.json()) as ApiResponse;
  console.log(`Status: ${resE.status}`);
  console.log('Response:', JSON.stringify(dataE, null, 2));
  if (resE.status === 400 && !dataE.success) {
    console.log('✅ Test E PASSED\n');
  } else {
    console.error('❌ Test E FAILED\n');
  }

  // -------------------------------------------------------------
  // Test F: quantity greater than allowed maximum (25) -> Expected 400
  // -------------------------------------------------------------
  console.log('--- Test F: quantity greater than allowed maximum (25) ---');
  const resF = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Kalu',
      roomNumber: '103',
      phone: '08077778888',
      orderType: 'ROOM_DELIVERY',
      items: [{ menuItemId: item1.id, quantity: 25 }],
    }),
  });
  const dataF = (await resF.json()) as ApiResponse;
  console.log(`Status: ${resF.status}`);
  console.log('Response:', JSON.stringify(dataF, null, 2));
  if (resF.status === 400 && !dataF.success) {
    console.log('✅ Test F PASSED\n');
  } else {
    console.error('❌ Test F FAILED\n');
  }

  // -------------------------------------------------------------
  // Test G: Invalid menuItemId -> Expected 404 / 400 error
  // -------------------------------------------------------------
  console.log('--- Test G: Invalid menuItemId ---');
  const resG = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Tunde',
      roomNumber: '104',
      phone: '08099990000',
      orderType: 'ROOM_DELIVERY',
      items: [{ menuItemId: 'non-existent-menu-item-id', quantity: 1 }],
    }),
  });
  const dataG = (await resG.json()) as ApiResponse;
  console.log(`Status: ${resG.status}`);
  console.log('Response:', JSON.stringify(dataG, null, 2));
  if ((resG.status === 404 || resG.status === 400) && !dataG.success) {
    console.log('✅ Test G PASSED\n');
  } else {
    console.error('❌ Test G FAILED\n');
  }

  // -------------------------------------------------------------
  // Test H: Unavailable menu item -> Expected rejected (400)
  // -------------------------------------------------------------
  console.log('--- Test H: Unavailable menu item ---');
  // Temporarily set item2 isAvailable = false
  await prisma.menuItem.update({
    where: { id: item2.id },
    data: { isAvailable: false },
  });

  const resH = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Sadiya',
      roomNumber: '105',
      phone: '08012344321',
      orderType: 'ROOM_DELIVERY',
      items: [{ menuItemId: item2.id, quantity: 1 }],
    }),
  });
  const dataH = (await resH.json()) as ApiResponse;
  console.log(`Status: ${resH.status}`);
  console.log('Response:', JSON.stringify(dataH, null, 2));

  // Restore item2 availability
  await prisma.menuItem.update({
    where: { id: item2.id },
    data: { isAvailable: true },
  });

  if (resH.status === 400 && !dataH.success) {
    console.log('✅ Test H PASSED\n');
  } else {
    console.error('❌ Test H FAILED\n');
  }

  // -------------------------------------------------------------
  // Test I: Attempt to send a fake client price -> Rejected or ignored
  // -------------------------------------------------------------
  console.log('--- Test I: Fake client price in body ---');
  const resI = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Hacker',
      roomNumber: '999',
      phone: '08000000000',
      orderType: 'ROOM_DELIVERY',
      items: [
        { menuItemId: item1.id, quantity: 1, price: 1 },
      ],
    }),
  });
  const dataI = (await resI.json()) as ApiResponse;
  console.log(`Status: ${resI.status}`);
  console.log('Response:', JSON.stringify(dataI, null, 2));
  if (resI.status === 400 && !dataI.success) {
    console.log('✅ Test I PASSED (Strict Zod validation rejected unauthorized price field)\n');
  } else {
    console.error('❌ Test I FAILED\n');
  }

  // -------------------------------------------------------------
  // Test J: GET existing order by orderNumber -> Expected 200
  // -------------------------------------------------------------
  console.log(`--- Test J: GET existing order by orderNumber (${createdOrderNumber}) ---`);
  const resJ = await fetch(`${API_BASE}/orders/${createdOrderNumber}`);
  const dataJ = (await resJ.json()) as ApiResponse;
  console.log(`Status: ${resJ.status}`);
  console.log('Response:', JSON.stringify(dataJ, null, 2));
  if (resJ.status === 200 && dataJ.success && dataJ.data?.orderNumber === createdOrderNumber) {
    console.log('✅ Test J PASSED\n');
  } else {
    console.error('❌ Test J FAILED\n');
  }

  // -------------------------------------------------------------
  // Test K: GET nonexistent order -> Expected 404
  // -------------------------------------------------------------
  console.log('--- Test K: GET nonexistent order ---');
  const resK = await fetch(`${API_BASE}/orders/ORD-NONEXISTENT-999999`);
  const dataK = (await resK.json()) as ApiResponse;
  console.log(`Status: ${resK.status}`);
  console.log('Response:', JSON.stringify(dataK, null, 2));
  if (resK.status === 404 && !dataK.success) {
    console.log('✅ Test K PASSED\n');
  } else {
    console.error('❌ Test K FAILED\n');
  }

  // -------------------------------------------------------------
  // Test L & M: Confirm snapshot values & total calculation
  // -------------------------------------------------------------
  console.log('--- Test L & M: Confirm OrderItem snapshots and totalAmount calculation ---');
  const orderFromDb = await prisma.order.findUnique({
    where: { orderNumber: createdOrderNumber },
    include: { items: true },
  });

  if (orderFromDb) {
    const expectedTotal = item1.price * 2 + item2.price * 1;
    const item1Snapshot = orderFromDb.items.find((i) => i.menuItemId === item1.id);
    const item2Snapshot = orderFromDb.items.find((i) => i.menuItemId === item2.id);

    const lPassed =
      item1Snapshot?.name === item1.name &&
      item1Snapshot?.unitPrice === item1.price &&
      item2Snapshot?.name === item2.name &&
      item2Snapshot?.unitPrice === item2.price;

    const mPassed = orderFromDb.totalAmount === expectedTotal;

    console.log(`Expected Total: ${expectedTotal} kobo, Actual Total: ${orderFromDb.totalAmount} kobo`);
    console.log(`Item 1 Snapshot Name: "${item1Snapshot?.name}", UnitPrice: ${item1Snapshot?.unitPrice}`);
    console.log(`Item 2 Snapshot Name: "${item2Snapshot?.name}", UnitPrice: ${item2Snapshot?.unitPrice}`);

    if (lPassed) console.log('✅ Test L PASSED (OrderItem name & unitPrice snapshots verified)');
    else console.error('❌ Test L FAILED');

    if (mPassed) console.log('✅ Test M PASSED (totalAmount matches server-side calculation perfectly)\n');
    else console.error('❌ Test M FAILED\n');
  } else {
    console.error('❌ Test L & M FAILED (Order not found in DB)\n');
  }

  await prisma.$disconnect();
}

runTests().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
