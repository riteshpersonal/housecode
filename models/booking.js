const mongoose = require("mongoose");

// Role schema for Admin roles (SuperAdmin, SubAdmin)
const BookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    lowecase: true,
    trim: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
  },
  propertyId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Propertie', required: true }
});

module.exports = mongoose.model("Booking", BookingSchema);
