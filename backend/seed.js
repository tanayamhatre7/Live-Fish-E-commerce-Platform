import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fishcenter';

const productsData = [
  // Original
  { name: 'Tilapia', description: 'Fresh farm-raised live Tilapia.', price: 15.00, category: 'Live Fish', imageUrl: 'https://images.unsplash.com/photo-1516027150596-f335359a3c5a?q=80&w=600&auto=format&fit=crop', stockQuantity: 100 },
  { name: 'Pomphret', description: 'Premium Silver Pomphret from trusted sources.', price: 35.00, category: 'Live Fish', imageUrl: 'https://images.unsplash.com/photo-1582845512747-e42001c95638?q=80&w=600&auto=format&fit=crop', stockQuantity: 50 },
  { name: 'Dried Shrimps', description: 'Sun-dried shrimps perfect for curries.', price: 12.00, category: 'Dry Fish', imageUrl: 'https://images.unsplash.com/photo-1594966627057-a3a2d200fc00?q=80&w=600&auto=format&fit=crop', stockQuantity: 200 },
  { name: 'Premium Fish Food Mini Pellets', description: 'Nutritious pellets for small sizes.', price: 8.00, category: 'Fish Food', imageUrl: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=600&auto=format&fit=crop', stockQuantity: 300 },
  
  // New Live Fishes
  { name: 'Salmon', description: 'Rich, flavorful, and loaded with Omega-3.', price: 45.00, category: 'Live Fish', imageUrl: 'https://loremflickr.com/600/400/salmon,fish', stockQuantity: 80 },
  { name: 'Prawns', description: 'Fresh, juicy prawns. Perfect for grilling or curries.', price: 25.00, category: 'Live Fish', imageUrl: 'https://loremflickr.com/600/400/prawns,seafood', stockQuantity: 120 },
  { name: 'Crabs', description: 'Live, meaty crabs caught fresh daily.', price: 30.00, category: 'Live Fish', imageUrl: 'https://loremflickr.com/600/400/crab,seafood', stockQuantity: 40 },
  { name: 'Catfish', description: 'Freshwater catfish, excellent for traditional recipes.', price: 18.00, category: 'Live Fish', imageUrl: 'https://loremflickr.com/600/400/catfish', stockQuantity: 60 },
  { name: 'Red Fish', description: 'Premium catch with tender white meat.', price: 28.00, category: 'Live Fish', imageUrl: 'https://loremflickr.com/600/400/redfish,ocean', stockQuantity: 45 },
  { name: 'Catla', description: 'Fresh Catla from Indian rivers. Rich taste.', price: 20.00, category: 'Live Fish', imageUrl: 'https://loremflickr.com/600/400/catla,fish', stockQuantity: 90 },
  { name: 'Rohu', description: 'A staple freshwater fish, nutrient-rich.', price: 18.00, category: 'Live Fish', imageUrl: 'https://loremflickr.com/600/400/rohu,fish', stockQuantity: 110 },
  { name: 'Pink Preach (Rani)', description: 'Delicate and sweet Rani fish.', price: 22.00, category: 'Live Fish', imageUrl: 'https://loremflickr.com/600/400/pink,fish', stockQuantity: 70 },
  { name: 'Eel', description: 'Fresh live eel, highly nutritious.', price: 40.00, category: 'Live Fish', imageUrl: 'https://loremflickr.com/600/400/eel,water', stockQuantity: 30 },
  { name: 'Bagda (Tiger Prawn)', description: 'Giant tiger prawns. The king of seafood.', price: 50.00, category: 'Live Fish', imageUrl: 'https://loremflickr.com/600/400/tiger,prawn', stockQuantity: 80 },
  { name: 'Bombay Duck (Live)', description: 'Local favorite, crisp when fried.', price: 15.00, category: 'Live Fish', imageUrl: 'https://loremflickr.com/600/400/bombayduck,raw', stockQuantity: 100 },
  
  // New Dried Fishes
  { name: 'Dried Squid', description: 'Chewy, salty, and perfect for roasting or stews.', price: 24.00, category: 'Dry Fish', imageUrl: 'https://loremflickr.com/600/400/squid,dried', stockQuantity: 150 },
  { name: 'Dried Bombay Duck (Bombil)', description: 'Intense flavor, the ultimate classic bombil.', price: 16.00, category: 'Dry Fish', imageUrl: 'https://loremflickr.com/600/400/bombil,dry', stockQuantity: 200 },
  { name: 'Dried Vakti', description: 'Traditional dried Vakti fish.', price: 20.00, category: 'Dry Fish', imageUrl: 'https://loremflickr.com/600/400/driedfish', stockQuantity: 100 },
  { name: 'Dried Mase', description: 'Mixed dried small fishes (mase), great for chutneys.', price: 10.00, category: 'Dry Fish', imageUrl: 'https://loremflickr.com/600/400/dry,seafood', stockQuantity: 250 }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB...');

    await User.deleteMany();
    await Product.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('fishadmin2026', salt);

    await User.create({
      name: 'Admin Tanaya',
      email: 'tanayamhatre7@gmail.com',
      password: hashedPassword,
      isAdmin: true
    });

    await Product.insertMany(productsData);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error('Error importing data', error);
    process.exit(1);
  }
};

seedDatabase();
