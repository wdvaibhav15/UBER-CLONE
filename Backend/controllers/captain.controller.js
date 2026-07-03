const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExists = await captainModel.findOne({ email });
    if (isCaptainAlreadyExists) {
        return res.status(400).json({ message: "Captain already exists" });
    }

    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({ 
        firstname: fullname.firstname, 
        lastname: fullname.lastname, 
        email, 
        password: hashedPassword, 
        color: vehicle.color, 
        plate: vehicle.plate, 
        capacity: vehicle.capacity, 
        vehicleType: vehicle.vehicleType 
    });
    const token = captain.generateAuthToken();
    res.status(201).json({ captain, token });

};

//login controller
module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }    
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select("+password");
    if(!captain) {
        return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    const  isMatch = await captain.comparePassword(password);
    if(!isMatch) {
        return res.status(401).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    const token = captain.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ captain, token });
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookie.token || req.headers.authorization.split(" ")[1];
    await blacklistTokenModel.create({ token });
    res.clearCookie("token");
    res.status(200).json({ msg: "Logged out successfully" });

}