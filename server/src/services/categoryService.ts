import { prisma } from '../lib/prisma';

export const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
