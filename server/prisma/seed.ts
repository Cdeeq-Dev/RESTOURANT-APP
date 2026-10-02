import { PrismaClient, AdminRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Seed Admin Account
  // DEVELOPMENT/SEED credential - MUST be changed before production!
  const devAdminEmail = 'admin@restaurant.local';
  const hashedPassword = await bcrypt.hash('Admin123!', 10);

  const admin = await prisma.admin.upsert({
    where: { email: devAdminEmail },
    update: {
      name: 'Restaurant Admin',
      passwordHash: hashedPassword,
      role: AdminRole.ADMIN,
    },
    create: {
      name: 'Restaurant Admin',
      email: devAdminEmail,
      passwordHash: hashedPassword,
      role: AdminRole.ADMIN,
    },
  });
  console.log(`✅ Admin seeded: ${admin.email}`);

  // 2. Seed Categories & Menu Items
  const categoryData = [
    {
      name: 'Breakfast',
      slug: 'breakfast',
      description: 'Delicious morning meals to start your day fresh',
      items: [
        {
          name: 'English Breakfast',
          slug: 'english-breakfast',
          description: 'Full breakfast with fried eggs, sausages, bacon, baked beans, grilled tomatoes, and toasted bread.',
          price: 650000, // ₦6,500 in kobo
          isFeatured: true,
        },
        {
          name: 'Pancakes with Syrup & Berries',
          slug: 'pancakes-syrup-berries',
          description: 'Fluffy golden pancakes served with maple syrup, whipped butter, and fresh berries.',
          price: 450000, // ₦4,500 in kobo
          isFeatured: false,
        },
        {
          name: 'Omelette & Toast',
          slug: 'omelette-toast',
          description: 'Three-egg omelette with onions, bell peppers, tomatoes, and cheese, served with buttered toast.',
          price: 400000, // ₦4,000 in kobo
          isFeatured: false,
        },
      ],
    },
    {
      name: 'Main Dishes',
      slug: 'main-dishes',
      description: 'Hearty Nigerian and international main courses',
      items: [
        {
          name: 'Jollof Rice & Grilled Chicken',
          slug: 'jollof-rice-grilled-chicken',
          description: 'Smoky West African Jollof rice served with seasoned grilled chicken leg and fried plantains.',
          price: 750000, // ₦7,500 in kobo
          isFeatured: true,
        },
        {
          name: 'Fried Rice & Spicy Chicken',
          slug: 'fried-rice-spicy-chicken',
          description: 'Savory fried rice loaded with diced vegetables and served with spicy peppered chicken.',
          price: 750000, // ₦7,500 in kobo
          isFeatured: false,
        },
        {
          name: 'Spaghetti Bolognese',
          slug: 'spaghetti-bolognese',
          description: 'Classic Italian pasta tossed in a rich, slow-cooked minced beef tomato sauce.',
          price: 800000, // ₦8,000 in kobo
          isFeatured: false,
        },
        {
          name: 'Grilled Croaker Fish & Chips',
          slug: 'grilled-croaker-fish-chips',
          description: 'Whole grilled croaker fish marinated in local spices, served with crispy french fries and tartar sauce.',
          price: 1200000, // ₦12,000 in kobo
          isFeatured: true,
        },
      ],
    },
    {
      name: 'Burgers & Sandwiches',
      slug: 'burgers-sandwiches',
      description: 'Satisfying gourmet burgers and multi-layer sandwiches',
      items: [
        {
          name: 'Classic Beef Burger',
          slug: 'classic-beef-burger',
          description: 'Juicy 100% beef patty with cheddar cheese, lettuce, tomato, pickles, and special sauce in a brioche bun.',
          price: 600000, // ₦6,000 in kobo
          isFeatured: false,
        },
        {
          name: 'Gourmet Chicken Burger',
          slug: 'gourmet-chicken-burger',
          description: 'Crispy fried chicken breast fillet with spicy mayo, coleslaw, and pickles in a toasted bun.',
          price: 650000, // ₦6,500 in kobo
          isFeatured: true,
        },
        {
          name: 'Triple Decker Club Sandwich',
          slug: 'triple-decker-club-sandwich',
          description: 'Toasted bread stacked with grilled chicken, bacon, boiled egg, lettuce, tomato, and mayonnaise.',
          price: 550000, // ₦5,500 in kobo
          isFeatured: false,
        },
      ],
    },
    {
      name: 'Pizza',
      slug: 'pizza',
      description: 'Freshly baked hand-tossed artisan pizzas',
      items: [
        {
          name: 'Margherita Pizza',
          slug: 'margherita-pizza',
          description: 'Classic Italian pizza with rich tomato sauce, fresh mozzarella cheese, and fresh basil leaves.',
          price: 900000, // ₦9,000 in kobo
          isFeatured: false,
        },
        {
          name: 'Spicy Chicken Pizza',
          slug: 'spicy-chicken-pizza',
          description: 'Topped with seasoned chicken chunks, bell peppers, red onions, mozzarella, and chili flakes.',
          price: 1100000, // ₦11,000 in kobo
          isFeatured: true,
        },
        {
          name: 'Beef Pepperoni Pizza',
          slug: 'beef-pepperoni-pizza',
          description: 'Loaded with spicy beef pepperoni slices, rich marinara sauce, and melted mozzarella cheese.',
          price: 1200000, // ₦12,000 in kobo
          isFeatured: false,
        },
      ],
    },
    {
      name: 'Drinks',
      slug: 'drinks',
      description: 'Refreshing cold soft drinks, fresh juices, and specialty beverages',
      items: [
        {
          name: 'Chilled Coca-Cola',
          slug: 'chilled-coca-cola',
          description: '33cl cold glass bottle of classic Coca-Cola.',
          price: 100000, // ₦1,000 in kobo
          isFeatured: false,
        },
        {
          name: 'Fresh Orange Juice',
          slug: 'fresh-orange-juice',
          description: '100% freshly squeezed natural orange juice served chilled.',
          price: 250000, // ₦2,500 in kobo
          isFeatured: false,
        },
        {
          name: 'Bottled Mineral Water',
          slug: 'bottled-mineral-water',
          description: '75cl chilled premium Still Mineral Water.',
          price: 80000, // ₦800 in kobo
          isFeatured: false,
        },
        {
          name: 'Classic Nigerian Chapman',
          slug: 'classic-nigerian-chapman',
          description: 'Signature mocktail with Fanta, Sprite, Angostura bitters, cucumber, lemon, and maraschino cherry.',
          price: 300000, // ₦3,000 in kobo
          isFeatured: true,
        },
      ],
    },
    {
      name: 'Desserts',
      slug: 'desserts',
      description: 'Sweet treats and decadent post-meal desserts',
      items: [
        {
          name: 'Rich Chocolate Cake',
          slug: 'rich-chocolate-cake',
          description: 'Decadent moist chocolate fudge layer cake topped with chocolate ganache.',
          price: 450000, // ₦4,500 in kobo
          isFeatured: false,
        },
        {
          name: 'Vanilla & Strawberry Ice Cream',
          slug: 'vanilla-strawberry-ice-cream',
          description: 'Two scoops of artisan ice cream served with strawberry drizzle and wafer biscuits.',
          price: 350000, // ₦3,500 in kobo
          isFeatured: false,
        },
        {
          name: 'Fresh Tropical Fruit Salad',
          slug: 'fresh-tropical-fruit-salad',
          description: 'Chilled mix of seasonal diced pineapple, watermelon, papaya, and grapes.',
          price: 300000, // ₦3,000 in kobo
          isFeatured: false,
        },
      ],
    },
  ];

  for (const cat of categoryData) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
      },
    });

    console.log(`📁 Category: ${category.name}`);

    for (const item of cat.items) {
      const menuItem = await prisma.menuItem.upsert({
        where: { slug: item.slug },
        update: {
          name: item.name,
          description: item.description,
          price: item.price,
          isFeatured: item.isFeatured,
          isAvailable: true,
          categoryId: category.id,
        },
        create: {
          name: item.name,
          slug: item.slug,
          description: item.description,
          price: item.price,
          isFeatured: item.isFeatured,
          isAvailable: true,
          categoryId: category.id,
        },
      });
      console.log(`  🍽️  Menu Item: ${menuItem.name} (${menuItem.price / 100} NGN / ${menuItem.price} kobo)`);
    }
  }

  console.log('✨ Seeding completed successfully!');
}

main()
  .catch((error) => {
    console.error("❌ Error during seeding:", error);
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  
