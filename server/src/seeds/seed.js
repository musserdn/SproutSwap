import db from '../config/connection.js';
import { User, Plant } from '../models/index.js';  // Import the Plant model
import cleanDB from './cleanDB.js';
import userData from './userData.json' with { type: 'json' };

const gardenPlants = [
  {
    name: "Akane Apple",
    plantApiId: "351",
    imgUrl: "https://perenual.com/storage/species_image/351_malus_akane/thumbnail/800px-Akane-Pomme-20141026.jpg"
  },
  {
    name: "Ambrosia Apple",
    plantApiId: "352",
    imgUrl: "https://perenual.com/storage/species_image/352_malus_ambrosia/thumbnail/30356393327_b96daa22cb_b.jpg"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to the database and clean existing data
    await db();
    await cleanDB();
    
    // First create the users without garden plants
    const createdUsers = await User.create(userData);
    
    // Then create the plant documents
    const plantDocs = await Plant.create(gardenPlants);
    
    // Now update each user with the plant references
    for (const user of createdUsers) {
      user.garden = plantDocs.map(plant => plant._id);
      await user.save();
    }
    
    console.log('Seeding completed successfully!');
    process.exit(0);
  }
  catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
