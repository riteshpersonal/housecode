const express = require("express");
const router = express.Router();
const Broker = require("../models/broker");
const Propertie = require("../models/properties");
const authenticateBroker = require("../backendmiddleware/authenticateBroker");
const Address = require("../models/address");


// const generateAccessAndRefereshTokensForBroker = async (id) => {
//   try {
//     const broker = await Broker.findById(id);
//     const accessToken = broker.generateAccessToken();
//     const refreshToken = broker.generateRefreshToken();

//     broker.refreshToken = refreshToken;
//     await broker.save({ validateBeforeSave: false });

//     return { accessToken, refreshToken };
//   } catch (error) {
//     throw new Error(
//       500,
//       "Something went wrong while generating referesh and access token"
//     );
//   }
// };

router.get('/broker', authenticateBroker, async (req, res) => {

  try {

    // Fetch admins with pagination and sorting
    const broker = await Broker.findById(req.userId)
     
    res.status(200).json(broker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//login broker
router.post("/broker-login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "email is required." });
  }

  const broker = await Broker.findOne({ email });

  if (!broker) {
    return res.status(400).json({ error: "Broker does not exist." });
  }

  const isPasswordValid = await broker.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid broker credentials" });
  }

    const accessToken = broker.generateAccessToken();
  const loggedInBroker = await Broker.findById(broker._id).select(
    "-password -refreshToken"
  );


  return res
    .status(200)
    .json({
      broker: loggedInBroker,
      accessToken,
      message: "broker logged in successfully",
    });
});

router.put("/update-profile",authenticateBroker , async (req, res) => {
  const { email, name, currentPassword, newPassword } = req.body; // Destructure fields from the request body

  // Validate input
  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    // Find the Broker by email
    const  broker = await Broker.findOne({ email });

    if (!broker) {
      return res.status(404).json({ error: "broker not found." });
    }

    // Validate the current password
    const isCurrentPasswordValid = await broker.isPasswordCorrect(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({ error: "Current password is incorrect." });
    }

    // Update fields if provided
    if (name) {
      broker.name = name;
    }

    if (newPassword) {
      broker.password = newPassword;
    }

    // Save the updated broker document
    await broker.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      broker: {
        id: broker._id,
        name: broker.name,
        email: broker.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
});
router.post("/broker-logout",authenticateBroker,  async (req, res) => {
  console.log(req.userId,"here")
  const broker = await Broker.findByIdAndUpdate(
    req.userId,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "broker logged Out" });
});

router.post("/broker-refresh-token", async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json({error:"unauthorized request"});
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const broker = await Broker.findById(decodedToken?._id);

    if (!broker) {
       return res.status(401).json({error:"Invalid refresh token"});
    }

    if (incomingRefreshToken !== broker?.refreshToken) {
      return res.status(401).json({error:"Refresh token is expired or used"});
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokensForBroker(broker._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json({
        accessToken,
        message: "Access token refreshed",
      });
  } catch (error) {
    return res.status(401).json({error: error?.message || "Invalid refresh token"});
  }
});

    // Get Brokers  Properties with pagination and filters
router.get('/properties/:brokerId',authenticateBroker, async (req, res) => {
        const {brokerId } = req.params;
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
router.put('/properties/:propertyId',authenticateBroker,  async (req, res) => {
  const { propertyId } = req.params;
  const updatedData = req.body;
  const  brokerId  = req.userId; 

  try {
    // Find the property by ID and brokerId and update it with the new data
    const updatedProperty = await Propertie.findOneAndUpdate(
      { _id: propertyId, brokerId: brokerId },
      { $set: { properties: updatedData } },  // Use $set to replace only the provided fields
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
router.post('/properties', authenticateBroker, async (req, res) => {
  try {
    const { Data } = req.body;
    const  brokerId  = req.userId; // Assuming req.userid contains the brokerId

    // Fetch broker details to get the broker's name
    const broker = await Broker.findById(brokerId);

    if (!broker) {
      return res.status(404).json({ message: 'Broker not found' });
    }

    // Create a new property object with brokerId, broker's name, and properties data
    const newProperties = {
      brokerId: brokerId,
      brokername: broker.name, 
      properties: Data
    };

    // Create a new property
    const newProperty = new Propertie(newProperties);

    // Save the property to the database
    const savedProperty = await newProperty.save();

    // Increment the property count for the broker
    await Broker.findByIdAndUpdate(brokerId, { $inc: { propertyCount: 1 } });

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

router.delete('/properties/:propertyId', authenticateBroker, async (req, res) => {
  const { propertyId } = req.params;
  const  brokerId  = req.userId; // Assuming req.userid contains the brokerId

  try {
    // Find the property by ID and brokerId and delete it
    const deletedProperty = await  Propertie.findOneAndDelete({ _id: propertyId, brokerId: brokerId });

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