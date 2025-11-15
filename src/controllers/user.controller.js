const authConfigs = require("../config/auth.config.js");
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail.utils.js");


// Register User
const userRegister = async (req, res) => {
  try {
    const {name, email, password, phoneNumber } = req.body;

        // Log the received email to confirm the request data
    console.log("Registering user with email:", email);

      // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered.",
      });
    };
    const user = await User.create({name, email, password, phoneNumber });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Login User
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    console.log(isMatched);
    if (!isMatched) {
      return res.status(404).json({
        success: false,
        message: "Incorrect Password",
      });
    } else {
      const token = authConfigs.encodedToken(user.email, user._id.toString());

      res.cookie("user-token", token); 
      res.status(200).json({
        success : true,
        message: "Successfully logged in",
        user: {
          id: user._id,
          email: user.email,
        },
        token : token,
      });
    };
  } catch (error) {
     console.error(error); 
    res.status(500).json({
        success: false,
        message: "Internal server error",
      error: error.message,
      });
  };
};

// Forget Password
const forgetPassword = async (req, res) => {

  const { email } = req.body;
  try {
    const user = await User.findOne({email});
     if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first.",
      });
    };

    // Create Token to Reset Password
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save();
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const message = `Reset your password: \n\n ${resetUrl}`;

    await sendEmail ({
      email: user.email,
      subject: "Password Reset Token",
      message
    });
    res.json({
      message: "Email Sent"
    });

  } catch (error) {
    console.error(error); 
    res.status(500).json({
        success: false,
        message: "Internal server error",
      error: error.message,
      });
  };
  console.log("Email sent to:", email);

};

// Reset Password

const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// Get All the Users
const getAllProfile = async (req, res) => {
  try {
    const facetStage = {
      $facet: {
        totalCount: [{ $count: "count" }],
        profile: [
          { $sort: { createdAt: -1 } },  // Sort profiles by creation date (descending)
          {
            $project: {
              name: 1,
              email: 1,
              phoneNumber: 1,
            },
          },
        ],
      },
    };

    const profile = await User.aggregate([facetStage]);

    // Check if profiles and total count exist
    if (profile.length === 0 || !profile[0].totalCount || profile[0].totalCount.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No profiles found!",
      });
    }

    const totalProfiles = profile[0].totalCount[0].count;
    const profiles = profile[0].profile;

    res.status(200).json({
      success: true,
      message: "Profiles fetched successfully",
      totalProfiles: totalProfiles,
      data: profiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "Something went wrong!",
    });
  }
};

// Get Single Profile
const getSingleProfile = async (req, res) => {
  try {

     // Guard against missing user from middleware
    const userId = req.user?.id;
    console.log("req.user:", req.user);
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    // Find the user by their ID from the token
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user profile
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching profile", error: err.message });
  }
};

const userController = { userRegister, userLogin, getAllProfile, getSingleProfile, forgetPassword, resetPassword };

module.exports = userController;
