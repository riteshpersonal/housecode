const mongoose = require('mongoose');

const PropertieSchema = new mongoose.Schema({
  brokername: {
    type: String,
    required: true
  },
  brokerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Broker', required: true },
  properties:
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ['Apartment', 'House', 'Studio', 'Other','Rental', 'Flat', 'Pg'],
      required: true 
    },
    address: {
      street: {
        type: String,
        required: true
      },
      city: {
        type: String,
         required: true, 
        index: true
      },
      state: {
        type: String,
         required: true 
      },
      zipCode: {
        type: String,
         required: true,
        index: true
      },
    },
    listingPrice: {
      type: Number,
      required: true, 
      index: true
    },
    depositAmount: {type: Number, default:0 },
    bhk: {
      type: String,
       required: true
    },
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

});

module.exports = mongoose.model('Propertie', PropertieSchema);
