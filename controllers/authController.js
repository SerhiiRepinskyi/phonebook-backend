const jwt = require("jsonwebtoken");

const User = require("../db/models/userModel");

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: "Email in use" });
    return;
  }
  const newUser = new User({ name, email, password });
  await newUser.hashPassword(password);
  await newUser.save();

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    token,
    user: {
      name,
      email,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({
      message: "Email or password is incorrect",
    });
    return;
  }

  const validatePassword = await user.comparePassword(password);
  if (!validatePassword) {
    res.status(401).json({
      message: "Email or password is incorrect",
    });
    return;
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email,
      name: user.name,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).send();
};

const getCurrent = (req, res) => {
  const { email, name } = req.user;
  res.json({ email, name });
};

module.exports = { signup, login, logout, getCurrent };
