const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const Broker = require("../models/broker");
const Propertie = require("../models/properties");
const Role = require("../models/role");
const authenticateAdmin = require("../backendmiddleware/middleware");
const Address = require("../models/address");


//login admin

router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "email is required." });
  }

  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(400).json({ error: "Admin does not exist." });
  }

  const isPasswordValid = await admin.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid admin credentials" });
  }

  const accessToken = admin.generateAccessToken();


  return res
    .status(200)
    .json({
      accessToken,
      message: "user logged in successfully",
    });
});


router.put("/update-profile", authenticateAdmin, async (req, res) => {
  const { email, name, currentPassword, newPassword } = req.body; // Destructure fields from the request body
  try {
    // Find the admin by email
    const admin = await Admin.findById(req.userId);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found." });
    }

    // Validate the current password
    if (newPassword) {
      const isCurrentPasswordValid = await admin.isPasswordCorrect(currentPassword);
      if (!isCurrentPasswordValid) {
        return res.status(401).json({ error: "Current password is incorrect." });
      }
    }


    // Update fields if provided
    if (name) {
      admin.name = name;
    }

    if (newPassword) {
      admin.password = newPassword;
    }
    if (email) {
      admin.email = email;
    }

    // Save the updated admin document
    await admin.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
});



// const authenticateAdmin = require("../backendmiddleware/authMiddleware");
// Create Admin
router.post('/admin', authenticateAdmin, async (req, res) => {
  const { name, email, password, role } = req.body;

  // Email pattern check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate name and email
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Name is required and should be a string.' });
  }
  if (!email || typeof email !== 'string' || !emailPattern.test(email)) {
    return res.status(400).json({ error: 'Valid email is required.' });
  }
  if (!password || password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters long.' });

  if (!role || (role !== 'superadmin' && role !== 'subadmin')) return res.status(400).json({ error: 'Valid role is required (superadmin/subadmin).' });

  try {
    let admin = await Admin.findOne({ email });
    if (admin) return res.status(400).json({ error: 'Admin already registered.' });

    admin = new Admin({
      name,
      email,
      password: password,
      role,
      createdBy: req.admin._id,
    });

    await admin.save();
    res.status(201).json({ message: 'Admin created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/admin', authenticateAdmin, async (req, res) => {

  try {

    // Fetch admins with pagination and sorting
    const admins = await Admin.findById(req.userId)
     
    res.status(200).json({
      admins
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get Admins with pagination
router.get('/admins', authenticateAdmin, async (req, res) => {
  const { pageNumber } = req.query;
  const page = Number(pageNumber) || 1;  // Default to page 1 if not provided
  const size = 8;  // Fixed page size of 8

  try {
    const skips = (page - 1) * size;

    // Fetch admins with pagination and sorting
    const admins = await Admin.find({}, { password: 0 })  // Exclude sensitive data like password
      .skip(skips)
      .limit(size)
      .sort({ createdAt: -1 });

    res.status(200).json({
      admins
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Create Broker
router.post('/broker', authenticateAdmin, async (req, res) => {
  const { name, email, password } = req.body;

  // Simple email regex pattern to check for a valid email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate name
  if (!name || typeof name !== 'string')
    return res.status(400).json({ error: 'Name is required and should be a string.' });

  // Validate email
  if (!email || typeof email !== 'string' || !emailPattern.test(email))
    return res.status(400).json({ error: 'Valid email is required.' });

  // Validate password
  if (!password || password.length < 6)
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });

  try {
    // Find the authenticated admin making the request
    const authenticatedAdmin = await Admin.findById(req.userId)
    // .populate('role');
    if (!authenticatedAdmin) {
      return res.status(403).json({ message: 'Unauthorized: Admin not found.' });
    }

    // // Check if the authenticated admin has permission to manage brokers
    // if (!authenticatedAdmin.role.permissions.canManageBrokers) {
    //   return res.status(403).json({ message: 'Unauthorized: You do not have permission to create brokers.' });
    // }

    // Check if broker already exists
    let broker = await Broker.findOne({ email });
    if (broker) return res.status(400).json({ error: 'Broker already registered.' });

    // Create and save the new broker
    broker = new Broker({
      name,
      email,
      password: password,
    });

    await broker.save();
    res.status(201).json({ message: 'Broker created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Get Brokers with pagination and filters
router.get('/broker', authenticateAdmin, async (req, res) => {
  const { pageNumber = 1, search } = req.query;
  const page = Number(pageNumber);
  const pageSize = 8;

  try {
    const skips = (page - 1) * pageSize;

    // Build the filter object
    const filter = {};

    if (search) {
      // Check if the search term matches a boolean value for "block" or "unblock"
      const isBoolean = search.toLowerCase() === 'block' || search.toLowerCase() === 'unblock';
      const isBlockedValue = search.toLowerCase() === 'block';

      // Create a combined filter for name, email, and isBlocked
      const conditions = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];

      if (isBoolean) {
        conditions.push({ isBlocked: isBlockedValue });
      }

      filter.$or = conditions;
    }

    // Fetch brokers based on the filter
    const brokers = await Broker.find(filter)
      .skip(skips)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    if (!brokers || brokers.length === 0) {
      return res.status(404).json({ message: 'No results found' });
    }

    return res.json(brokers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Get suggestion Brokers with  filters
router.get('/broker/search', async (req, res) => {
  const { search } = req.query;
  console.log(search, "search")
  try {
    // Build the filter object
    const filter = {};

    if (search) {
      // Check if the search term matches an email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isBoolean = search.toLowerCase() === 'block' || search.toLowerCase() === 'unblock';
      const isBlockedValue = search.toLowerCase() === 'block';

      // Create a combined filter for name, email, and isBlocked
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];

      if (isBoolean) {
        filter.$or.push({ isBlocked: isBlockedValue });
      }
    }

    // Fetch brokers based on the filter, limited to 10 documents
    const brokers = await Broker.find(filter)
      .limit(10)
      .sort({ createdAt: -1 });

    if (!brokers || brokers.length === 0) {
      return res.status(404).json({ message: 'No results found' });
    }

    return res.json(brokers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Block Broker
router.patch('/broker/:id/block', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { action } = req.body; // Expecting 'block' or 'unblock' action in the request body

  // Validate action
  if (!['block', 'unblock'].includes(action)) {
    return res.status(400).json({ message: "Invalid action. Use 'block' or 'unblock'." });
  }

  try {
    // Find the authenticated admin making the request
    const authenticatedAdmin = await Admin.findById(req.userId)
    // .populate('role');
    if (!authenticatedAdmin) {
      return res.status(403).json({ message: 'Unauthorized: Admin not found.' });
    }

    // // Check if the authenticated admin has permission to manage brokers
    // if (!authenticatedAdmin.role.permissions.canManageBrokers) {
    //   return res.status(403).json({ message: 'Unauthorized: You do not have permission to block/unblock brokers.' });
    // }

    // Find the broker to block/unblock
    const broker = await Broker.findById(id);
    if (!broker) {
      return res.status(404).json({ message: 'Broker not found.' });
    }

    // Toggle block/unblock based on the action
    broker.isBlocked = action === 'block';
    await broker.save();

    const message = action === 'block' ? 'Broker has been blocked successfully.' : 'Broker has been unblocked successfully.';
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Update Admin
router.put('/admin/:id', authenticateAdmin, async (req, res) => {
  const { name, email, roleName } = req.body;
  const { id } = req.params;

  // Email pattern check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate name and email
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Name is required and should be a string.' });
  }
  if (!email || typeof email !== 'string' || !emailPattern.test(email)) {
    return res.status(400).json({ error: 'Valid email is required.' });
  }

  try {
    // Find the admin making the request (authenticated admin)
    const authenticatedAdmin = await Admin.findById(req.admin._id).populate('role');
    if (!authenticatedAdmin) {
      return res.status(403).json({ message: 'Unauthorized: Admin not found.' });
    }

    // Check if the authenticated admin has permission to update other admins
    if (!authenticatedAdmin.role.permissions.canCreateAdmin) {
      return res.status(403).json({ message: 'Unauthorized: You do not have permission to update admins.' });
    }

    // Find the target admin to update
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found.' });
    }

    // If roleName is provided, find the corresponding Role from the Role collection
    let role;
    if (roleName) {
      role = await Role.findOne({ role: roleName });
      if (!role) {
        return res.status(400).json({ error: 'Invalid role.' });
      }
    }

    // Update the target admin's fields
    admin.name = name;
    admin.email = email;
    admin.role = role ? role._id : admin.role; // Update role only if a new role is found

    // Save the updated admin data
    await admin.save();

    res.status(200).json({ message: 'Admin updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Update Broker
router.patch('/broker/:id', authenticateAdmin, async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.params;

  // Simple email regex pattern to check for a valid email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate name
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Name is required and should be a string.' });
  }

  // Validate email
  if (!email || typeof email !== 'string' || !emailPattern.test(email)) {
    return res.status(400).json({ error: 'Valid email is required.' });
  }

  // Validate password if provided
  if (password && password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  try {
    // Find the authenticated admin making the request
    const authenticatedAdmin = await Admin.findById(req.userId)
    // .populate('role');
    if (!authenticatedAdmin) {
      return res.status(403).json({ message: 'Unauthorized: Admin not found.' });
    }

    // // Check if the authenticated admin has permission to manage brokers
    // if (!authenticatedAdmin.role.permissions.canManageBrokers) {
    //   return res.status(403).json({ message: 'Unauthorized: You do not have permission to update brokers.' });
    // }

    // Find the broker to update
    const broker = await Broker.findById(id);
    if (!broker) {
      return res.status(404).json({ message: 'Broker not found.' });
    }

    // Update broker fields
    if (broker.name) broker.name = name;

    if (broker.email) broker.email = email;



    // Update password only if provided
    if (password) {
      broker.password = password;
    }

    await broker.save();

    res.status(200).json({ broker });
  } catch (error) {
    console.error(error,"hi");
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Delete Admin
router.delete('/admin/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findById(id);
    if (!admin) return res.status(404).json({ message: 'Admin not found.' });

    await admin.remove();
    res.status(200).json({ message: 'Admin deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete Broker
router.delete('/broker/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    // Find the authenticated admin making the request
    const authenticatedAdmin = await Admin.findById(req.admin._id).populate('role');
    if (!authenticatedAdmin) {
      return res.status(403).json({ message: 'Unauthorized: Admin not found.' });
    }

    // Check if the authenticated admin has permission to manage brokers
    if (!authenticatedAdmin.role.permissions.canManageBrokers) {
      return res.status(403).json({ message: 'Unauthorized: You do not have permission to delete brokers.' });
    }

    // Find the broker to delete
    const broker = await Broker.findById(id);
    if (!broker) {
      return res.status(404).json({ message: 'Broker not found.' });
    }

    // Delete the broker
    await broker.remove();
    res.status(200).json({ message: 'Broker deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/properties/:brokerId', authenticateAdmin, async (req, res) => {
  const { brokerId } = req.params;
  const { pageNumber = 1 } = req.query;
  const page = Number(pageNumber);
  const pageSize = 10;

  try {
    const skips = (page - 1) * pageSize;

    // Validate if brokerId is provided
    if (!brokerId) {
      return res.status(400).json({ message: 'Broker ID is required' });
    }

    // Fetch properties based on the brokerId filter
    const properties = await Propertie.find({ brokerId })
      .skip(skips)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    if (!properties || properties.length === 0) {
      return res.status(404).json({ message: 'No properties found for this broker' });
    }
    return res.json(properties);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Update property details
router.put('/properties/:propertyId', authenticateAdmin, async (req, res) => {
  const { propertyId } = req.params;
  const updatedData  = req.body;
  const { brokerId } = req.userId;

  try {
    // Find the property by ID and brokerId and update it with the new data
    const updatedProperty = await Propertie.findOneAndUpdate(
      { _id: propertyId },
      { $set: { properties: updatedData } }, // Use $set to replace only the provided fields
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: 'Property not found or not authorized to update' });
    }

    return res.json(updatedProperty);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Route to add a new property
router.post('/properties', authenticateAdmin, async (req, res) => {
  try {
    const { Data } = req.body;

    // Validate required fields
    // if (! Data.name || ! Data.location || ! Data.price) {
    //   return res.status(400).json({ message: 'Name, location, and price are required.' });
    // }

    const newProperties = {
      brokername: "Admin",
      brokerId: req.userId,
      properties: Data
    }
    // Create a new property
    const newProperty = new Propertie(newProperties);

    // Save the property to the database
    const savedProperty = await newProperty.save();
    await Address.findOneAndUpdate(
      {name:"addressfilter" }, 
      {
        $addToSet: {
          city: Data?.address.city,     // Only add if city isn't already in the array
          street:Data?.address.street, // Only add if street isn't already in the array
          state:Data?.address.state,   // Only add if state isn't already in the array
          zipCode:Data?.address.zipCode, // Only add if zipCode isn't already in the array
        }
      },
      { new: true, upsert: true } // Return the updated document and create it if it doesn't exist
    );
    // Return the saved property in the response
    return res.status(201).json(savedProperty);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/properties/:propertyId', authenticateAdmin, async (req, res) => {
  const { propertyId } = req.params;
  const { brokerId } = req.userId;

  try {
    // Find the property by ID and brokerId and delete it
    const deletedProperty = await Propertie.findOneAndDelete({ _id: propertyId });

    // If the property was not found, return a 404 response
    if (!deletedProperty) {
      return res.status(404).json({ message: 'Property not found or not authorized to delete' });
    }

    // Return success message after deletion
    return res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;  