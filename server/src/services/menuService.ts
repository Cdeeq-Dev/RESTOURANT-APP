import { prisma } from '../lib/prisma';

export interface GetMenuItemsFilters {
  categorySlug?: string;
  featured?: boolean;
}

export const getMenuItems = async (filters: GetMenuItemsFilters = {}) => {
  const whereClause: any = {
    isAvailable: true,
  };

  if (filters.categorySlug) {
    whereClause.category = {
      slug: filters.categorySlug,
    };
  }

  if (filters.featured !== undefined) {
    whereClause.isFeatured = filters.featured;
  }

  return prisma.menuItem.findMany({
    where: whereClause,
    orderBy: [
      { isFeatured: 'desc' },
      { name: 'asc' },
    ],
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      price: true,
      imageUrl: true,
      isAvailable: true,
      isFeatured: true,
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getFeaturedMenuItems = async () => {
  return prisma.menuItem.findMany({
    where: {
      isAvailable: true,
      isFeatured: true,
    },
    orderBy: {
      name: 'asc',
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      price: true,
      imageUrl: true,
      isAvailable: true,
      isFeatured: true,
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getMenuItemBySlug = async (slug: string) => {
  return prisma.menuItem.findFirst({
    where: {
      slug,
      isAvailable: true,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      price: true,
      imageUrl: true,
      isAvailable: true,
      isFeatured: true,
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
};
