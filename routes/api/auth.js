const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const auth = require("../../middleware/auth");

const img = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|webp|JPG|PNG|JPEG|jpeg|WEBP)$/))
      return cb(new Error("This is not a correct format of the file"));
    cb(undefined, true);
  },
});

// User Model
const User = require("../../models/User");

// @route   POST api/auth
// @desc    Auth User
// @access  Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Пожалуйста, заполните все поля" });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user)
      return res.status(400).json({ msg: "Пользователь не существует" });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ msg: "Неверные учетные данные" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

router.put("/user/:id", img.single("avatar"), async (req, res) => {
  const { id } = req.params;

  // const updatedUser = {
  //   name: req.body.name,
  //   email: req.body.email,
  //   avatar: req.body.avatar,
  // };

  let user = await User.findByIdAndUpdate(id, req.body);

  return res.status(202).send({
    error: false,
    user,
  });
});

module.exports = router;
