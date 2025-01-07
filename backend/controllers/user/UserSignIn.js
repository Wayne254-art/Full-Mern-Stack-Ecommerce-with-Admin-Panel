

const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email) {
            return res.status(400).json({ message: "Please provide email", error: true, success: false });
        }
        if (!password) {
            return res.status(400).json({ message: "Please provide password", error: true, success: false });
        }

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", error: true, success: false });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            // Create JWT token with user data
            const tokenData = {
                _id: user._id,
                email: user.email,
            };
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

            // Set cookie options
            const tokenOptions = {
                httpOnly: true,
                maxAge: 8 * 60 * 60 * 1000, // 8 hours in milliseconds
                sameSite: "Strict",
                secure: process.env.NODE_ENV === 'production' // Ensure secure cookies in production
            };

            // Send the token as a cookie and respond with success
            res.cookie("token", token, tokenOptions).status(200).json({
                message: "Login successful",
                data: token,
                success: true,
                error: false
            });
        } else {
            return res.status(401).json({ message: "Wrong credentials", error: true, success: false });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message || err ,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;
