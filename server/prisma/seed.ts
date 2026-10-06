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
          imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
          isFeatured: true,
        },
        {
          name: 'Pancakes with Syrup & Berries',
          slug: 'pancakes-syrup-berries',
          description: 'Fluffy golden pancakes served with maple syrup, whipped butter, and fresh berries.',
          price: 450000, // ₦4,500 in kobo
          imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
          isFeatured: false,
        },
        {
          name: 'Omelette & Toast',
          slug: 'omelette-toast',
          description: 'Three-egg omelette with onions, bell peppers, tomatoes, and cheese, served with buttered toast.',
          price: 400000, // ₦4,000 in kobo
          imageUrl: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80',
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
          imageUrl: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=800&q=80',
          isFeatured: true,
        },
        {
          name: 'Fried Rice & Spicy Chicken',
          slug: 'fried-rice-spicy-chicken',
          description: 'Savory fried rice loaded with diced vegetables and served with spicy peppered chicken.',
          price: 750000, // ₦7,500 in kobo
          imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
          isFeatured: false,
        },
        {
          name: 'Spaghetti Bolognese',
          slug: 'spaghetti-bolognese',
          description: 'Classic Italian pasta tossed in a rich, slow-cooked minced beef tomato sauce.',
          price: 800000, // ₦8,000 in kobo
          imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
          isFeatured: false,
        },
        {
          name: 'Grilled Croaker Fish & Chips',
          slug: 'grilled-croaker-fish-chips',
          description: 'Whole grilled croaker fish marinated in local spices, served with crispy french fries and tartar sauce.',
          price: 1200000, // ₦12,000 in kobo
          imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
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
          imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
          isFeatured: false,
        },
        {
          name: 'Gourmet Chicken Burger',
          slug: 'gourmet-chicken-burger',
          description: 'Crispy fried chicken breast fillet with spicy mayo, coleslaw, and pickles in a toasted bun.',
          price: 650000, // ₦6,500 in kobo
          imageUrl: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
          isFeatured: true,
        },
        {
          name: 'Triple Decker Club Sandwich',
          slug: 'triple-decker-club-sandwich',
          description: 'Toasted bread stacked with grilled chicken, bacon, boiled egg, lettuce, tomato, and mayonnaise.',
          price: 550000, // ₦5,500 in kobo
          imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
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
          imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
          isFeatured: false,
        },
        {
          name: 'Spicy Chicken Pizza',
          slug: 'spicy-chicken-pizza',
          description: 'Topped with seasoned chicken chunks, bell peppers, red onions, mozzarella, and chili flakes.',
          price: 1100000, // ₦11,000 in kobo
          imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
          isFeatured: true,
        },
        {
          name: 'Beef Pepperoni Pizza',
          slug: 'beef-pepperoni-pizza',
          description: 'Loaded with spicy beef pepperoni slices, rich marinara sauce, and melted mozzarella cheese.',
          price: 1200000, // ₦12,000 in kobo
          imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
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
          imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
          isFeatured: false,
        },
        {
          name: 'Fresh Orange Juice',
          slug: 'fresh-orange-juice',
          description: '100% freshly squeezed natural orange juice served chilled.',
          price: 250000, // ₦2,500 in kobo
          imageUrl: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
          isFeatured: false,
        },
        {
          name: 'Bottled Mineral Water',
          slug: 'bottled-mineral-water',
          description: '75cl chilled premium Still Mineral Water.',
          price: 80000, // ₦800 in kobo
          imageUrl: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=800&q=80',
          isFeatured: false,
        },
        {
          name: 'Classic Nigerian Chapman',
          slug: 'classic-nigerian-chapman',
          description: 'Signature mocktail with Fanta, Sprite, Angostura bitters, cucumber, lemon, and maraschino cherry.',
          price: 300000, // ₦3,000 in kobo
          imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
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
          imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
          isFeatured: false,
        },
        {
          name: 'Vanilla & Strawberry Ice Cream',
          slug: 'vanilla-strawberry-ice-cream',
          description: 'Two scoops of artisan ice cream served with strawberry drizzle and wafer biscuits.',
          price: 350000, // ₦3,500 in kobo
          imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
          isFeatured: false,
        },
        {
          name: 'Fresh Tropical Fruit Salad',
          slug: 'fresh-tropical-fruit-salad',
          description: 'Chilled mix of seasonal diced pineapple, watermelon, papaya, and grapes.',
          price: 300000, // ₦3,000 in kobo
          imageUrl: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=800&q=80',
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
          imageUrl: item.imageUrl,
          isFeatured: item.isFeatured,
          isAvailable: true,
          categoryId: category.id,
        },
        create: {
          name: item.name,
          slug: item.slug,
          description: item.description,
          price: item.price,
          imageUrl: item.imageUrl,
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
  
