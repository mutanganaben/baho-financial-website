import { PrismaClient, ProductCategory, Province, AdminRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed with products, branches, and admin user...');

  // 1. Seed Products (Matching updated max tenure months)
  const products = [
    {
      slug: 'cash-advance',
      name: 'Cash Advance',
      category: ProductCategory.CASH_ADVANCE,
      description: 'Instant short-term cash for urgent daily needs.',
      minAmount: 50000,
      maxAmount: 500000,
      interestRate: 10.0,
      maxTenureMonths: 3,
    },
    {
      slug: 'personal-loan',
      name: 'Personal Loan',
      category: ProductCategory.PERSONAL_LOAN,
      description: 'Finance education, health, or household improvements.',
      minAmount: 200000,
      maxAmount: 2000000,
      interestRate: 10.0,
      maxTenureMonths: 4,
    },
    {
      slug: 'startup-business-loan',
      name: 'Startup Business Loan',
      category: ProductCategory.STARTUP_BUSINESS_LOAN,
      description: 'Kickstart your new business with confidence.',
      minAmount: 500000,
      maxAmount: 5000000,
      interestRate: 12.0,
      maxTenureMonths: 6,
    },
    {
      slug: 'business-growth-loan',
      name: 'Business Growth Loan',
      category: ProductCategory.BUSINESS_GROWTH_LOAN,
      description: 'Scale your existing business to the next level.',
      minAmount: 2000000,
      maxAmount: 20000000,
      interestRate: 14.0,
      maxTenureMonths: 6,
    },
  ];

  for (const prod of products) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });
  }
  console.log(`✅ Seeded ${products.length} Products.`);

  // 2. Seed Branches
  const branches = [
    {
      code: 'kigali-kabuga',
      name: 'Kigali — Head Office',
      province: Province.KIGALI,
      district: 'Kabuga',
      address: 'Kabuga',
      phone: '+250 788 381 721',
      email: null,
      openingHours: 'Mon–Fri: 8:00am – 5:00pm',
      latitude: -1.9774,
      longitude: 30.2227,
    },
    {
      code: 'ruyenzi',
      name: 'Ruyenzi Branch',
      province: Province.SOUTH,
      district: 'Kamonyi District',
      address: 'Ruyenzi',
      phone: '+250 799 539 433',
      email: null,
      openingHours: 'Mon–Fri: 8:00am – 5:00pm',
      latitude: -1.9781,
      longitude: 29.9886,
    },
    {
      code: 'nyagatare-rwimiyaga',
      name: 'Nyagatare — Rwimiyaga Branch',
      province: Province.EAST,
      district: 'Nyagatare District',
      address: 'Rwimiyaga',
      phone: '+250 788 389 156',
      email: null,
      openingHours: 'Mon–Fri: 8:00am – 5:00pm',
      latitude: -1.3642,
      longitude: 30.4356,
    },
    {
      code: 'nyagatare-rukomo',
      name: 'Nyagatare — Rukomo Branch',
      province: Province.EAST,
      district: 'Nyagatare District',
      address: 'Rukomo',
      phone: '+250 799 532 988',
      email: null,
      openingHours: 'Mon–Fri: 8:00am – 5:00pm',
      latitude: -1.4589,
      longitude: 30.2854,
    },
  ];

  for (const branch of branches) {
    await prisma.branch.upsert({
      where: { code: branch.code },
      update: branch,
      create: branch,
    });
  }
  console.log(`✅ Seeded ${branches.length} Branch locations.`);

  // 3. Seed Default Administrator Account
  const defaultAdmin = {
    email: 'admin@bahofinancial.rw',
    password: bcrypt.hashSync('Admin@2026', 10),
    fullName: 'System Administrator',
    role: AdminRole.SUPER_ADMIN,
    isActive: true,
  };

  await prisma.adminUser.upsert({
    where: { email: defaultAdmin.email },
    update: defaultAdmin,
    create: defaultAdmin,
  });
  console.log(`🔐 Seeded Default Administrator Account: ${defaultAdmin.email}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
