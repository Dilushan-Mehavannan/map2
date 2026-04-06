import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Place from './models/Place.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/srilanka_day_planner';

const placesData = [
  {
    id: '1',
    name: 'Koneswaram Temple',
    category: 'Religious',
    description: 'Ancient Hindu temple dedicated to Lord Shiva, perched on a rocky promontory overlooking the Indian Ocean.',
    openingTime: '05:00',
    closingTime: '20:00',
    travelTips: 'Dress modestly, remove shoes before entering. Best visited early morning or evening for stunning views.',
    distanceFromHome: 2.5,
    latitude: 8.5778,
    longitude: 81.2333,
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400',
    estimatedVisitDuration: 1.5,
    tags: ['temple', 'hindu', 'ocean']
  },
  {
    id: '2',
    name: 'Fort Frederick',
    category: 'Heritage',
    description: 'Historic Dutch fort built in the 17th century, offering panoramic views of the harbor.',
    openingTime: '08:00',
    closingTime: '18:00',
    travelTips: 'Great for photography. Entry fee applies. Explore the museum inside.',
    distanceFromHome: 2.5,
    latitude: 8.5714,
    longitude: 81.2333,
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400',
    estimatedVisitDuration: 1,
    tags: ['fort', 'dutch', 'views']
  },
  {
    id: '3',
    name: 'Uppuveli Beach',
    category: 'Beach',
    description: 'Beautiful sandy beach with clear waters, perfect for swimming and relaxation.',
    openingTime: '00:00',
    closingTime: '23:59',
    travelTips: 'Best for water sports. Watch for currents. Many resorts nearby.',
    distanceFromHome: 1,
    latitude: 8.6000,
    longitude: 81.2167,
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    estimatedVisitDuration: 3,
    tags: ['beach', 'swimming', 'resorts']
  },
  {
    id: '4',
    name: 'Nilaveli Beach',
    category: 'Beach',
    description: 'Pristine beach known for its golden sands and calm waters.',
    openingTime: '00:00',
    closingTime: '23:59',
    travelTips: 'Ideal for snorkeling. Less crowded than other beaches.',
    distanceFromHome: 10,
    latitude: 8.6833,
    longitude: 81.2000,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    estimatedVisitDuration: 3,
    tags: ['beach', 'snorkeling', 'calm']
  },
  {
    id: '5',
    name: 'Pigeon Island National Park',
    category: 'Nature',
    description: 'Marine national park famous for coral reefs and diverse marine life.',
    openingTime: '08:00',
    closingTime: '17:00',
    travelTips: 'Boat access only. Snorkeling gear available. Best visited in the morning.',
    distanceFromHome: 14,
    latitude: 8.7167,
    longitude: 81.2000,
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400',
    estimatedVisitDuration: 2,
    tags: ['marine', 'coral', 'snorkeling']
  },
  {
    id: '6',
    name: 'Marble Beach',
    category: 'Beach',
    description: 'Unique beach with marble-like rocks and crystal-clear waters.',
    openingTime: '00:00',
    closingTime: '23:59',
    travelTips: 'Great for photography. Rocky terrain, wear good shoes.',
    distanceFromHome: 6.5,
    latitude: 8.6500,
    longitude: 81.2167,
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    estimatedVisitDuration: 2,
    tags: ['beach', 'rocks', 'photography']
  },
  {
    id: '7',
    name: 'Kanniya Hot Springs',
    category: 'Nature',
    description: 'Natural hot springs with therapeutic properties, surrounded by lush greenery.',
    openingTime: '06:00',
    closingTime: '18:00',
    travelTips: 'Bring swimwear. Water temperature around 40°C. Picnic area available.',
    distanceFromHome: 10,
    latitude: 8.5167,
    longitude: 81.2833,
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400',
    estimatedVisitDuration: 2,
    tags: ['hot springs', 'therapeutic', 'nature']
  },
  {
    id: '8',
    name: 'Velgam Vehera',
    category: 'Religious',
    description: 'Ancient Buddhist stupa with historical significance and peaceful surroundings.',
    openingTime: '06:00',
    closingTime: '18:00',
    travelTips: 'Peaceful site. Good for meditation. Nearby ancient ruins to explore.',
    distanceFromHome: 7,
    latitude: 8.5333,
    longitude: 81.2500,
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400',
    estimatedVisitDuration: 1,
    tags: ['stupa', 'buddhist', 'meditation']
  },
  {
    id: '9',
    name: 'Trincomalee Harbour',
    category: 'Nature',
    description: 'One of the finest natural harbors in the world, with scenic views and historical importance.',
    openingTime: '00:00',
    closingTime: '23:59',
    travelTips: 'Best viewed from Fort Frederick. Boat trips available for harbor exploration.',
    distanceFromHome: 3,
    latitude: 8.5667,
    longitude: 81.2333,
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400',
    estimatedVisitDuration: 1,
    tags: ['harbor', 'scenic', 'historical']
  },
  {
    id: '10',
    name: 'Dutch Cemetery',
    category: 'Heritage',
    description: 'Historic Dutch cemetery with colonial-era tombstones and architecture.',
    openingTime: '08:00',
    closingTime: '17:00',
    travelTips: 'Respectful site. Interesting for history buffs and photography.',
    distanceFromHome: 1,
    latitude: 8.5833,
    longitude: 81.2167,
    imageUrl: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3a0?w=400',
    estimatedVisitDuration: 0.5,
    tags: ['cemetery', 'dutch', 'colonial']
  },
  {
    id: '11',
    name: 'Lovers Leap',
    category: 'Nature',
    description: 'Scenic viewpoint with breathtaking ocean views and a romantic legend.',
    openingTime: '00:00',
    closingTime: '23:59',
    travelTips: 'Sunset views are spectacular. Steep climb, wear comfortable shoes.',
    distanceFromHome: 2,
    latitude: 8.6000,
    longitude: 81.2333,
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    estimatedVisitDuration: 1,
    tags: ['viewpoint', 'ocean', 'romantic']
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing places
    await Place.deleteMany({});
    console.log('Cleared existing places');

    // Insert new places
    await Place.insertMany(placesData);
    console.log('Seeded database with places');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();