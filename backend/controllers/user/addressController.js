const Address = require("../../models/addressModel");
const mongoose = require('mongoose');

// Add Address for logged-in user
exports.createAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      firstName,
      lastName,
      phoneNumber,
      county,
      subcounty,
      ward,
      addressDetails,
      isDefault,
    } = req.body;

    // Create a new address document
    const newAddress = new Address({
      userId: userId,
      firstName,
      lastName,
      phoneNumber,
      county,
      subcounty,
      ward,
      addressDetails,
      isDefault,
    });

    // Save the new address to the database
    const savedAddress = await newAddress.save();

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: savedAddress,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      success: false,
      message: "Error adding address",
      error: error.message || error,
    });
  }
};

// Get addresses for the logged-in user
exports.getAddresses = async (req, res) => {
  try {
    const userId = req.userId;

    const addresses = await Address.find({userId});
    return res.status(200).json({ success: true, addresses });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Error fetching addresses",
        error: error.message,
      });
  }
};

// Get all addresses
// exports.getAddresses = async (req, res) => {
//     try {
//         const addresses = await Address.find();
//         res.status(200).json({ success: true, data: addresses });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// };

// Update an address
exports.updateAddress = async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: updatedAddress,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete an address
exports.deleteAddress = async (req, res) => {
    try {
      const addressId = req.params.addressId;
      
      if (!mongoose.Types.ObjectId.isValid(addressId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid address ID",
        });
      }
  
      const address = await Address.findByIdAndDelete(addressId);
  
      if (!address) {
        return res.status(404).json({
          success: false,
          message: "Address not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Address deleted successfully",
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  
