

const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { email, password, firstname, lastname } = req.body;

        // Check if the required fields are provided
        if (!email) throw new Error("Please provide email");
        if (!password) throw new Error("Please provide password");
        if (!firstname) throw new Error("Please provide firstname");
        if (!lastname) throw new Error("Please provide lastname");

        // Check if the user already exists
        const user = await userModel.findOne({ email });
        if (user) throw new Error("User already exists.");

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) throw new Error("Something went wrong");

        // Prepare the payload with the hashed password and role
        const payload = {
            email,
            firstname,
            lastname,
            role: "GENERAL",
            password: hashPassword,
        };

        // Create and save the new user
        const userData = new userModel(payload);
        const saveUser = await userData.save();

        // Send a success response
        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully!"
        });
    } catch (err) {
        // console.error("Error during user sign-up:", err);
        res.status(500).json({
            message: err.message || err ,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;
