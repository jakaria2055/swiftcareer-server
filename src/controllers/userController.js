import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import getDataURI from "../../utils/dataURI.js";
import cloudinary from "../../utils/cloudinary.js";
import path from "path";

/**********************User Register********************/
export const userRegister = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(404).json({
        message: "Missing credential field!",
        success: false,
      });
    }

    const file = req.file;
    const fileURI = getDataURI(file);
    const cloudResponse = await cloudinary.uploader.upload(fileURI.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User Already exists.",
        success: false,
      });
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    await newUser.save();

    return res.status(200).json({
      message: `Account created successfully for ${fullname}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error to register",
      success: false,
    });
  }
}

/********************User Login********************** */
export const userLogin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(404).json({
        message: "Missing credential field!",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    if (user.role !== role) {
      return res.status(403).json({
        message: "You don't have the necessary role access.",
        success: false,
      });
    }

    const tokenData = { userId: user._id };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,     
        sameSite: "None",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log("Login Error:", error.message);
    res.status(500).json({
      message: "Server Error to Login",
      success: false,
    });
  }
};

/*********************User Logout******************** */
export const userLogout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error to Logout",
      success: false,
    });
  }
};

//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;
//     const file = req.file;

//     //CLOUDINARY SETUP
//     const fileURI = getDataURI(file);
//     const cloudinaryResponse = await cloudinary.uploader.upload(
//       fileURI.content
//     );

//     let skillsArray;
//     if (skills) {
//       skillsArray = skills.split(",").map((s) => s.trim());
//     }

//     const userId = req.id;
//     let user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found.",
//         success: false,
//       });
//     }

//     if (fullname) user.fullname = fullname;
//     if (email) user.email = email;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (skills) user.profile.skills = skillsArray;
//     if (bio) user.profile.bio = bio;
//     if (cloudinaryResponse) {
//       user.profile.resume = cloudinaryResponse.secure_url;
//       user.profile.resumeOriginalname = file.originalname;
//     }

//     await user.save();

//     user = {
//       _id: user._id,
//       fullname: user.fullname,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//       profile: user.profile,
//     };

//     return res.status(200).json({
//       message: `Account updated successfully for ${user.fullname}`,
//       user,
//       success: true,
//     });
//   } catch (error) {
//     console.log("Update Profile Error:", error.message);
//     res.status(500).json({
//       message: "Error to update profile",
//       success: false,
//     });
//   }
// };

/*******************User Profile Update******************** */
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    let cloudinaryResponse;

    // Only upload to cloudinary if file exists
    if (file) {
      const fileURI = getDataURI(file);
      console.log(fileURI.content.slice(0, 50)); //REMOVE LINE
      cloudinaryResponse = await cloudinary.uploader.upload(fileURI.content, {
        folder: "resumes",
        resource_type: "raw",
        public_id: path.parse(file.originalname).name, // ✅ keep filename (no extension)
        format: "pdf", // ✅ ensure .pdf extension is appended
        use_filename: true, // ✅ Cloudinary will preserve your filename
        unique_filename: false, // ✅ prevent random string name
      });
      console.log("Cloudinary upload response:", cloudinaryResponse); //REMOVE LINE
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",").map((s) => s.trim());
    }

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    // Update fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (skills) user.profile.skills = skillsArray;
    if (bio) user.profile.bio = bio;

    // Only update resume if file was uploaded
    if (cloudinaryResponse) {
      user.profile.resume = cloudinaryResponse.secure_url;
      user.profile.resumeOriginalname = file.originalname;
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: `Account updated successfully for ${user.fullname}`,
      user,
      success: true,
    });
  } catch (error) {
    console.log("Update Profile Error:", error.message);
    res.status(500).json({
      message: "Error to update profile",
      success: false,
    });
  }
};
