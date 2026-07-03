const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

// Registration controller
module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
        return res.status(400).json({ message: "User already exists" });
    }
    
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({ 
        firstname: fullname.firstname, 
        lastname: fullname.lastname, 
        email, 
        password: hashedPassword 
    });
    const token = user.generateAuthToken();

    res.status(201).json({ user, token });
};

// Login controller
module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if(!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    
    const  isMatch = await user.comparePassword(password);
    if(!isMatch) {
        return res.status(401).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    const token = user.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ user, token });

}

// Profile controller
module.exports.getUserProfile = async (req, res, next) => {
    const user = req.user;
    res.status(200).json({ user });
}

// Logout controller
module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie("token");
    const token = req.cookie.token || req.headers.authorization.split(" ")[1];

    await blacklistTokenModel.create({ token });
    res.status(200).json({ msg: "Logged out successfully" });
}
