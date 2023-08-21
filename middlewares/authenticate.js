const User = require("../db/models/userModel");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    res.status(401).json({ message: "Not authorized" });
    return;
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token || token !== user.token) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
  }
};

module.exports = authenticate;
