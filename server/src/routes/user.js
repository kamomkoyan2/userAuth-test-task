const express = require("express");

const passport = require("passport");

const userController = require("../controllers/user");
const router = express.Router();

router.post("/register", userController.signUpUser);

router.post("/login", userController.signInUser);

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

module.exports = router;
