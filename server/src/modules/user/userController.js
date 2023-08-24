const jwt = require("jsonwebtoken");
const User = require("../../modals/userModal");
const asyncHandler = require("express-async-handler");

const getUser = async (req, res) => {
  const getAllUser = await User.find().select("-password");
  res.send(getAllUser);
};

const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, mobileNumber, userName, ProfileIcon, job_title } =
    req.body;

  if (name || email || mobileNumber || userName || ProfileIcon || job_title) {
    let oldEmails = await User.findById(req.user.id);
    const oldNumbers = await User.findById(req.user.id);
    // const temp = oldNumbers?.mobileNumber
    // const newNumbs = temp
    // console.log(newNumbs);
    const data = {
      mobileNumber,
      userName,
      ProfileIcon,
      job_title,
    };

    let user = await User.findByIdAndUpdate(req.user.id, data, {
      new: true,
    });


    if (oldEmails.email.includes(email) && email != undefined) {
      
    } else {
      user.email.push(email);
    }

    if (oldEmails.mobileNumber.includes(mobileNumber) && mobileNumber != undefined) {
      
    } else {
      user.mobileNumber.push(mobileNumber)
    }
    user.save();

    res.status(200).json(user);
  } else {
    res.status(401);
    throw new Error("enter any value");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send("enter all field");
  }
  const userLogin = await User.findOne({ email: email });

  // if (userLogin && (bcrypt.compare(password, userLogin.password))) {
  //     res.status(201).json({
  //         _id: userLogin._id,
  //         name: userLogin.name,
  //         email: userLogin.email,
  //         token: generateToken(userLogin._id)
  //     })
  // } else {
  //     res.status(401)
  //     throw new Error("invalid credentials")
  // }
});

const getMe = (req, res) => {
  // res.status(200)
  // const user = {
  //     id: req.user._id,
  //     name: req.user.name,
  //     email: req.user.email
  // }
  // res.send(user)
};

module.exports = { updateProfile, loginUser, getUser, getMe };
