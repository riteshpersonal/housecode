const mongoose = require('mongoose');

const BrokerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'broker' },
  isApproved: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  properties: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      type: { 
        type: String, 
        enum: ['Apartment', 'House', 'Studio', 'Other'], 
        required: true 
      },
      address: {
        street: { type: String, required: true },
        city: { type: String, required: true, index: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true, index: true },
      },
      listingPrice: { type: String, required: true, index: true },
      depositAmount: { type: String, default: '0' },
      bhk: { type: String, required: true },
      amenities: [{ type: String }],
      furnishingStatus: { 
        type: String, 
        enum: ['Furnished', 'Semi-Furnished', 'Unfurnished'], 
        required: true 
      },
      images: [{ type: String }], // Array of image URLs
      videoTourLink: { type: String },
      ownerAuthorization: { type: Boolean, default: false },
      legalDisclosures: [{ type: String }],
      specialNotes: { type: String },
    },
  ],
});

module.exports = mongoose.model('Broker', BrokerSchema);
