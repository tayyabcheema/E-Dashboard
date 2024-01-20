const User = require("../Models/user");
const jwtKey = "e-commerce";
const Jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "2d" }, (err, token) => {
    if (err) {
      res.send({ result: "Something went wrong" });
    }
    res.send({ result, auth: token });
  });
};

// Login API

const loginUser = async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2d" }, (err, token) => {
        if (err) {
          res.send({ result: "No User Found" });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.send({ result: "No User Found" });
  }
};

module.exports = { registerUser, loginUser };
