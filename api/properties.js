const express = require("express");
const router = express.Router();
const Propertie = require("../models/properties");
const Address = require("../models/address");
const Booking = require("../models/booking");

router.get("/properties", async (req, res) => {
  const {
    brokerId,
    name,
    type,
    city,
    state,
    zipCode,
    listingPrice,
    bhk,
    furnishingStatus,
    listingPriceMin,
    listingPriceMax,
    pageNumber = 1,
  } = req.query;
  console.log(req.query,"query")
  const page = Number(pageNumber);
  const pageSize = 10;

  try {
    const skips = (page - 1) * pageSize;

    // Build the filter object
    const filter = {};

    // Apply filters based on query parameters if they are provided
    if (brokerId) {
      filter.brokerId = brokerId;
    }
    if (name) {
      filter.name = { $regex: name, $options: "i" }; // Case-insensitive search for name
    }
    if (type) {
      filter["properties.type"] = type; // Exact match for property type
    }
    if (city) {
      filter["properties.address.city"] = { $regex: city, $options: "i" }; // Case-insensitive search for city
    }
    if (state) {
      filter["properties.address.state"] = { $regex: state, $options: "i" }; // Case-insensitive search for state
    }
    if (zipCode) {
      filter["properties.address.zipCode"] = zipCode; // Exact match for zip code
    }
    if (listingPrice) {
      filter["properties.listingPrice"] = listingPrice; // Exact match for listing price (you can also add range filters if needed)
    }
    if (bhk) {
      filter["properties.bhk"] = bhk; // Exact match for BHK
    }
    if (furnishingStatus) {
      filter["properties.furnishingStatus"] = furnishingStatus; // Exact match for furnishing status
    }
    if (listingPriceMin || listingPriceMax) {
      filter["properties.listingPrice"] = {};
      if (listingPriceMin)
        filter["properties.listingPrice"].$gte = listingPriceMin;
      if (listingPriceMax)
        filter["properties.listingPrice"].$lte = listingPriceMax;
    }

    // Fetch properties based on the filter
    const properties = await Propertie.find(filter)
      .skip(skips)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    if (!properties || properties.length === 0) {
      return res
        .status(404)
        .json({ message: "No properties found matching the filters" });
    }

    return res.json(properties);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


// get single property details
router.get("/:propertyId", async (req, res) => {
  const { propertyId } = req.params;
  try {
    // Find the property by ID and update it with the new data
    const property = await Propertie.findById(propertyId);
    // console.log(property)
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    
    return res.json(property);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/address/filter", async (req, res) => {

  try {
    // Find the property by ID and update it with the new data
    const address = await Address.findOne({name:'addressfilter'});
    // console.log(property)
    if (!address) {
      return res.status(404).json({ message: "Addresses not found" });
    }

    
    return res.json(address);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to add a new booking
router.post("/add-booking", async (req, res) => {
  try {
    const { name, email, phone, message, propertyId } = req.body;
    const newBooking = new Booking({
      name,
      email,
      phone,
      message,
      propertyId,
    });
    const savedBooking = await newBooking.save();
    res.status(201).json({ success: true, booking: savedBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add booking", error });
  }
});

// Route to fetch all bookings
router.get("/all-bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate('propertyId'); // Populate property data if needed
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch bookings", error });
  }
});

module.exports = router;
