const mongoose = require('mongoose');

// Role schema for Admin roles (SuperAdmin, SubAdmin)
const AddressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    default:"addressfilter"
  },
  city: [String],
  street: [String],
  state: [String],
  zipCode: [String],
});

module.exports = mongoose.model('Address', AddressSchema);
