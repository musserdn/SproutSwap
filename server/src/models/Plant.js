import { Schema, model } from 'mongoose';

// Define the schema for a Plant
const plantSchema = new Schema(
  {
    // The plant API ID (like an identifier from an external API or your database)
    plantApiId: {
      type: String,
      required: true, // Ensure this field is required
    },
    // The name of the plant
    name: {
      type: String,
      required: true, // This field is also required
    },
    // URL for the image of the plant
    imgUrl: {
      type: String,
      required: false, // This field is optional, so we don't require it
    },
  },
  {
    // Options to add timestamps (createdAt, updatedAt) to documents
    timestamps: true,
  }
);

// Create the Plant model based on the schema
const Plant = model('Plant', plantSchema);

// Export the model so it can be used elsewhere
export default Plant;
