const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
console.log(dns.getServers());
const User = require('./models/User');
const Event = require('./models/Event');
const Category = require('./models/Category');

dotenv.config();

const users = [
  {
    name: "RC Events Admin",
    email: "admin@rcevents.com",
    password: "password123",
    role: "admin",
  },
];

const events = [
  {
    title: "Wedding Photographer",
    category: "Photography",
    location: "Bangalore",
    mapLink: "https://maps.google.com",
    date: "2026-08-15",
    time: "09:00 AM",
    payment: 3500,
    vacancies: 3,
    dressCode: "Black Formal",
    description: "Looking for experienced wedding photographers.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
    status: "Open",
  },
  {
    title: "Reception Anchor",
    category: "Anchor",
    location: "Whitefield, Bangalore",
    mapLink: "https://maps.google.com",
    date: "2026-08-18",
    time: "06:00 PM",
    payment: 2500,
    vacancies: 2,
    dressCode: "Traditional",
    description: "Energetic anchor required for reception event.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865",
    status: "Open",
  },
  {
    title: "Catering Staff",
    category: "Catering",
    location: "Electronic City",
    mapLink: "https://maps.google.com",
    date: "2026-08-22",
    time: "10:00 AM",
    payment: 1200,
    vacancies: 15,
    dressCode: "Uniform",
    description: "Experienced catering staff required.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033",
    status: "Open",
  },
  {
    title: "Mehendi Artist",
    category: "Mehendi Artist",
    location: "Jayanagar",
    mapLink: "https://maps.google.com",
    date: "2026-08-25",
    time: "11:00 AM",
    payment: 2800,
    vacancies: 4,
    dressCode: "Traditional",
    description: "Professional Mehendi artists needed.",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf",
    status: "Open",
  },
  {
    title: "Registration Executive",
    category: "Registration",
    location: "Koramangala",
    mapLink: "https://maps.google.com",
    date: "2026-08-28",
    time: "08:00 AM",
    payment: 1500,
    vacancies: 6,
    dressCode: "Business Casual",
    description: "Handle guest registrations at event venue.",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
    status: "Open",
  },
  {
    title: "Event Promotion Team",
    category: "Promotion",
    location: "Indiranagar",
    mapLink: "https://maps.google.com",
    date: "2026-09-01",
    time: "09:30 AM",
    payment: 1800,
    vacancies: 8,
    dressCode: "RC Events T-Shirt",
    description: "Promote upcoming events across Bangalore.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    status: "Open",
  },
];

const categories = [
  { name: "Anchor" },
  { name: "Mehendi Artist" },
  { name: "Photography" },
  { name: "Catering" },
  { name: "Registration" },
  { name: "Promotion" },
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('\n✅ MongoDB connection open...');

        await User.deleteMany();
        await Event.deleteMany();
        await Category.deleteMany();
        await Category.insertMany(categories);
        console.log(`📂 Created ${categories.length} categories.`);

        // Hash user passwords
        const salt = await bcrypt.genSalt(10);
        const hashedUsers = users.map(u => ({
            ...u,
            password: bcrypt.hashSync(u.password, salt),
            isVerified: true
        }));

        const createdUsers = await User.insertMany(hashedUsers);
            console.log(`👤 Created ${createdUsers.length} users.`);

        // Link events to admin
        const createdEvents = await Event.insertMany(events);
        console.log(`🎉 Created ${createdEvents.length} distinct events with Unsplash images.`);

        console.log("\n🎉 RC Events database seeded successfully!");
            console.log("-----------------------------------------");
console.log("Admin Email : admin@rcevents.com");
            console.log("Password    : password123");
            console.log("-----------------------------------------");

        process.exit();
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};

seedDatabase();









// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const bcrypt = require("bcryptjs");
// const dns = require("dns");

// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// dotenv.config();

// const User = require("./models/User");
// const Category = require("./models/Category");

// const events = [
//   {
//     title: "Wedding Photographer",
//     category: "Photography",
//     location: "Bangalore",
//     mapLink: "https://maps.google.com",
//     date: "2026-08-15",
//     time: "09:00 AM",
//     payment: 3500,
//     vacancies: 3,
//     dressCode: "Black Formal",
//     description: "Looking for experienced wedding photographers.",
//     image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
//     status: "Open",
//   },
//   {
//     title: "Reception Anchor",
//     category: "Anchor",
//     location: "Whitefield, Bangalore",
//     mapLink: "https://maps.google.com",
//     date: "2026-08-18",
//     time: "06:00 PM",
//     payment: 2500,
//     vacancies: 2,
//     dressCode: "Traditional",
//     description: "Energetic anchor required for reception event.",
//     image: "https://images.unsplash.com/photo-1511578314322-379afb476865",
//     status: "Open",
//   },
//   {
//     title: "Catering Staff",
//     category: "Catering",
//     location: "Electronic City",
//     mapLink: "https://maps.google.com",
//     date: "2026-08-22",
//     time: "10:00 AM",
//     payment: 1200,
//     vacancies: 15,
//     dressCode: "Uniform",
//     description: "Experienced catering staff required.",
//     image: "https://images.unsplash.com/photo-1555244162-803834f70033",
//     status: "Open",
//   },
//   {
//     title: "Mehendi Artist",
//     category: "Mehendi Artist",
//     location: "Jayanagar",
//     mapLink: "https://maps.google.com",
//     date: "2026-08-25",
//     time: "11:00 AM",
//     payment: 2800,
//     vacancies: 4,
//     dressCode: "Traditional",
//     description: "Professional Mehendi artists needed.",
//     image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf",
//     status: "Open",
//   },
//   {
//     title: "Registration Executive",
//     category: "Registration",
//     location: "Koramangala",
//     mapLink: "https://maps.google.com",
//     date: "2026-08-28",
//     time: "08:00 AM",
//     payment: 1500,
//     vacancies: 6,
//     dressCode: "Business Casual",
//     description: "Handle guest registrations at event venue.",
//     image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
//     status: "Open",
//   },
//   {
//     title: "Event Promotion Team",
//     category: "Promotion",
//     location: "Indiranagar",
//     mapLink: "https://maps.google.com",
//     date: "2026-09-01",
//     time: "09:30 AM",
//     payment: 1800,
//     vacancies: 8,
//     dressCode: "RC Events T-Shirt",
//     description: "Promote upcoming events across Bangalore.",
//     image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
//     status: "Open",
//   },
// ];

// const categories = [
//   { name: "Anchor" },
//   { name: "Mehendi Artist" },
//   { name: "Photography" },
//   { name: "Catering" },
//   { name: "Registration" },
//   { name: "Promotion" },
// ];

// const seedDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);

//     console.log("✅ MongoDB Connected");

//     // Clear collections
//     await User.deleteMany({});
//     await Category.deleteMany({});

//     console.log("🗑️ Old users and categories removed.");

//     // Create Admin
//     const hashedPassword = await bcrypt.hash("admin123", 10);

//     const admin = await User.create({
//       name: "RC Events Admin",
//       email: "admin@rcevents.com",
//       password: hashedPassword,
//       role: "admin",
//       isVerified: true,
//     });

//     console.log("👤 Admin Created");

//     // Create Categories
//     await Category.insertMany(categories);

//     console.log("📂 Categories Created");

//     console.log("--------------------------------");
//     console.log("Admin Login");
//     console.log("Email    : admin@rcevents.com");
//     console.log("Password : admin123");
//     console.log("--------------------------------");

//     console.log("🎉 Seed completed successfully.");

//     process.exit();

//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// seedDatabase();