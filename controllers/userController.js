const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.fetchAllUser = async (req, res) => {
  try {
    const user = await User.find({});
    return res.status(200).json({
      success: true,
      message: "Users Fetched Successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching User Details",
    });
  }
};

exports.fetchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching User Details",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    const updateData = { email };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }
    console.log("Update Data",updateData)
    const updatedUser = await User.findByIdAndUpdate(id, { $set: updateData },{new:true});
    return res.status(200).json({
      success : true ,
      message : "Updated Successfully",
      updatedUser
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Updating User Details",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try{
    const {id} = req.params ;
    const user = await User.findById(id);
    if(!user){
      return res.status(400).json({
        success : false ,
        message : "USer Not Found"
      })
    }
    const deletedUser = await User.findByIdAndDelete(id) ;
    return res.status(200).json({
      success : true ,
      message : "User Deleted Successfully",
      deletedUser
    })
  }catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Deleteing User Details",
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    console.log(userName, email, password);
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      userName: userName,
      password: hashedPassword,
      email: email,
      repositories: [],
      followedUser: [],
      starRepo: [],
    });
    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Signing Up",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are Required",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        id: user._id,
        email: user.email,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      return res.cookie("token", token, options).status(200).json({
        success: true,
        message: "Login Successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password does not match",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Login",
    });
  }
};
