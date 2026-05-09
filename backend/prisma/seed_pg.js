const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const bcrypt = require('bcrypt');
const { randomUUID } = require('crypto');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  try {
    await client.connect();
    console.log('Connected to database...');

    // Clear data
    await client.query('TRUNCATE TABLE "PageSection", "MenuItem", "Menu", "Page", "User", "Role", "SectionType" RESTART IDENTITY CASCADE');

    // Roles
    const adminRoleId = randomUUID();
    await client.query('INSERT INTO "Role" (id, name) VALUES ($1, $2)', [adminRoleId, 'ADMIN']);

    // Admin User
    const userId = randomUUID();
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await client.query('INSERT INTO "User" (id, email, name, password, "roleId", "updatedAt") VALUES ($1, $2, $3, $4, $5, NOW())', 
      [userId, 'admin@kitsakshar.ac.in', 'KITS Admin', hashedPassword, adminRoleId]);

    // Menu
    const mainMenuId = randomUUID();
    await client.query('INSERT INTO "Menu" (id, name) VALUES ($1, $2)', [mainMenuId, 'main']);

    const menuItems = [
      ['Home', '/', 1],
      ['Departments', '#departments', 2],
      ['Placements', '#placements', 3],
      ['Events', '#events', 4],
      ['Gallery', '#gallery', 5],
    ];

    for (const [label, url, order] of menuItems) {
      await client.query('INSERT INTO "MenuItem" (id, label, url, "order", "menuId") VALUES ($1, $2, $3, $4, $5)', 
        [randomUUID(), label, url, order, mainMenuId]);
    }

    // Section Types
    const sectionTypes = ['hero', 'about', 'placements', 'events', 'gallery', 'departments', 'footer'];
    const typeMap = {};

    for (const typeName of sectionTypes) {
      const typeId = randomUUID();
      await client.query('INSERT INTO "SectionType" (id, name) VALUES ($1, $2)', [typeId, typeName]);
      typeMap[typeName] = typeId;
    }

    // Home Page
    const homePageId = randomUUID();
    await client.query('INSERT INTO "Page" (id, slug, title) VALUES ($1, $2, $3)', [homePageId, 'home', 'KITS Akshar | Premier Engineering Excellence']);

    // Sections
    const sections = [
      { type: 'hero', order: 1, content: { badge: 'Top Ranked Engineering College', title: 'KITS Akshar', subtitle: 'Experience the pinnacle of technical education.', primaryCta: 'Explore Programs', secondaryCta: 'Virtual Tour' } },
      { type: 'about', order: 2, content: { title: 'Shaping Global Innovators', description: 'Academic tradition with future-ready technology.', ctaText: 'Our Legacy', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop' } },
      { type: 'departments', order: 3, content: { title: 'Academic Powerhouses', subtitle: 'Specialized departments led by industry veterans.', items: [{ id: 1, name: 'Computer Science', code: 'CSE', desc: 'Masters of Code and AI.' }, { id: 2, name: 'Robotics & AI', code: 'RAI', desc: 'Building the machines of tomorrow.' }] } },
      { type: 'placements', order: 4, content: { title: 'Global Career Gateway', subtitle: '95%+ placement rates.', stats: [{ label: 'Highest Package', value: '52 LPA' }, { label: 'Average Package', value: '12.4 LPA' }] } },
      { type: 'footer', order: 5, content: { address: '123 Education Lane, Knowledge City', phone: '+91 98765 43210', email: 'info@kitsakshar.ac.in', links: [{ label: 'Privacy', url: '/privacy' }], socials: { linkedin: '#', twitter: '#' } } }
    ];

    for (const s of sections) {
      await client.query('INSERT INTO "PageSection" (id, "pageId", "typeId", "order", content) VALUES ($1, $2, $3, $4, $5)', 
        [randomUUID(), homePageId, typeMap[s.type], s.order, JSON.stringify(s.content)]);
    }

    console.log('Seed completed successfully via Direct PG!');
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await client.end();
  }
}

seed();
