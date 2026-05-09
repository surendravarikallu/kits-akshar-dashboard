import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import prisma from '../src/lib/prisma';
import * as bcrypt from 'bcrypt';

async function main() {
  console.log('Starting seed process...');

  // Clear existing data to avoid unique constraint violations
  await prisma.pageSection.deleteMany({});
  await prisma.menuItem.deleteMany({});
  await prisma.menu.deleteMany({});
  await prisma.page.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.sectionType.deleteMany({});

  // 1. Roles
  const adminRole = await prisma.role.create({
    data: { name: 'ADMIN' }
  });

  // 2. Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@kitsakshar.ac.in',
      name: 'KITS Admin',
      password: hashedPassword,
      roleId: adminRole.id
    }
  });

  // 3. Menu
  const mainMenu = await prisma.menu.create({
    data: { name: 'main' }
  });

  const menuItems = [
    { label: 'Home', url: '/', order: 1 },
    { label: 'Departments', url: '#departments', order: 2 },
    { label: 'Placements', url: '#placements', order: 3 },
    { label: 'Events', url: '#events', order: 4 },
    { label: 'Gallery', url: '#gallery', order: 5 },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: { ...item, menuId: mainMenu.id }
    });
  }

  // 4. Section Types
  const sectionTypes = ['hero', 'about', 'placements', 'events', 'gallery', 'departments', 'footer', 'stats', 'testimonials', 'faq', 'innovation'];
  const typeMap: Record<string, string> = {};

  for (const typeName of sectionTypes) {
    const type = await prisma.sectionType.create({
      data: { name: typeName }
    });
    typeMap[typeName] = type.id;
  }

  // 5. Home Page
  const homePage = await prisma.page.create({
    data: {
      slug: 'home',
      title: 'KITS Akshar | Premier Engineering Excellence'
    }
  });

  // 6. Page Sections
  const sections = [
    {
      type: 'hero',
      order: 1,
      content: {
        badge: 'Top Ranked Engineering College',
        title: 'KITS Akshar',
        subtitle: 'Experience the pinnacle of technical education with our immersive "UI/UX Pro Max" motion-driven learning environment.',
        primaryCta: 'Explore Programs',
        secondaryCta: 'Virtual Tour'
      }
    },
    {
      type: 'about',
      order: 2,
      content: {
        title: 'Shaping Global Innovators',
        description: 'At KITS Akshar, we blend academic tradition with future-ready technology. Our mission is to produce leaders who can navigate the complexities of the modern digital world.',
        ctaText: 'Our Legacy',
        imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop'
      }
    },
    {
      type: 'departments',
      order: 3,
      content: {
        title: 'Academic Powerhouses',
        subtitle: 'Specialized departments led by industry veterans and world-class researchers.',
        items: [
          { id: 1, name: 'Computer Science', code: 'CSE', desc: 'Masters of Code and AI.' },
          { id: 2, name: 'Robotics & AI', code: 'RAI', desc: 'Building the machines of tomorrow.' },
          { id: 3, name: 'Sustainable Energy', code: 'SE', desc: 'Powering the future responsibly.' },
          { id: 4, name: 'Quantum Computing', code: 'QC', desc: 'The next frontier of calculation.' }
        ]
      }
    },
    {
      type: 'placements',
      order: 4,
      content: {
        title: 'Global Career Gateway',
        subtitle: 'Consistently hitting 95%+ placement rates in Fortune 500 companies.',
        stats: [
          { label: 'Highest Package', value: '52 LPA' },
          { label: 'Average Package', value: '12.4 LPA' },
          { label: 'Recruiters', value: '150+' }
        ]
      }
    },
    {
      type: 'events',
      order: 5,
      content: {
        title: 'Dynamic Campus Pulse',
        subtitle: 'From International Hackathons to Cultural Extravaganzas.',
        items: [
          { id: 1, title: 'Quantum Hack 2026', date: 'March 12', category: 'Technical' },
          { id: 2, title: 'Alumni Tech Talk', date: 'April 05', category: 'Professional' }
        ]
      }
    },
    {
      type: 'gallery',
      order: 6,
      content: {
        title: 'The Visual Experience',
        subtitle: 'Immerse yourself in our state-of-the-art facilities.',
        items: [
          { id: 1, title: 'Main Library', size: 'large' },
          { id: 2, title: 'AI Research Lab', size: 'medium' }
        ]
      }
    },
    {
      type: 'stats',
      order: 7,
      content: {
        items: [
          { id: 1, label: "Placement Rate", value: "98", suffix: "%" },
          { id: 2, label: "Global Partners", value: "120", suffix: "+" },
          { id: 3, label: "Tech Symposiums", value: "45", suffix: "" },
          { id: 4, label: "Student Innovators", value: "5000", suffix: "+" },
        ]
      }
    },
    {
      type: 'innovation',
      order: 8,
      content: {
        title: 'Pioneering the Future',
        items: [
          { id: 1, title: "AI Research Hub", desc: "Developing neural architectures for next-gen motion engines." },
          { id: 2, title: "UI/UX Pro Lab", desc: "Where kinetic synchronization meets human-computer interaction." },
          { id: 3, title: "Quantum Forge", desc: "Simulating molecular dynamics with quantum-accelerated kernels." }
        ]
      }
    },
    {
      type: 'testimonials',
      order: 9,
      content: {
        title: 'Voices of Excellence',
        items: [
          { id: 1, name: "Arjun Mehta", role: "SDE @ Google", content: "The immersive learning environment at KITS Akshar was the catalyst for my career.", avatar: "AM" },
          { id: 2, name: "Sarah Jenkins", role: "Product Designer", content: "KITS doesn't just teach you how to build; they teach you how to create experiences.", avatar: "SJ" }
        ]
      }
    },
    {
      type: 'faq',
      order: 10,
      content: {
        title: 'Common Queries',
        items: [
          { question: "What makes KITS Akshar a 'Pro Max' experience?", answer: "We integrate cinematic motion design into our pedagogy." },
          { question: "Are admissions open?", answer: "Yes, admissions for the 2026-2027 batch are open." }
        ]
      }
    },
    {
      type: 'footer',
      order: 11,
      content: {
        address: '123 Education Lane, Knowledge City, KITS Campus',
        phone: '+91 98765 43210',
        email: 'info@kitsakshar.ac.in',
        links: [
          { label: 'Privacy Policy', url: '/privacy' },
          { label: 'Terms of Service', url: '/terms' },
          { label: 'Careers', url: '/careers' }
        ],
        socials: {
          linkedin: 'https://linkedin.com/school/kitsakshar',
          twitter: 'https://twitter.com/kitsakshar'
        }
      }
    }
  ];

  for (const s of sections) {
    await prisma.pageSection.create({
      data: {
        pageId: homePage.id,
        typeId: typeMap[s.type]!,
        order: s.order,
        content: s.content
      }
    });
  }

  console.log('Seed completed successfully! Admin login: admin@kitsakshar.ac.in / admin123');
}

main()
  .catch((e) => {
    console.error('Seed Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
