

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    userId: {type: Schema.Types.ObjectId,ref: 'User',required: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    county: { type: String, required: true },
    subcounty: { type: String, required: true },
    ward: { type: String, required: true },
    addressDetails: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
});

module.exports = mongoose.model('Address', AddressSchema);
