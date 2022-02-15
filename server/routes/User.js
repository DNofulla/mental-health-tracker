const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");
const VerificationCode = require("../models/VerificationCode");

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

router.get("/", async (req, res) => {
  res
    .status(400)
    .json({ message: "INVALID ENDPOINT! DO NOT use this endpoint!" });
});

router.get("/all", async (req, res) => {
  const users = User.find();

  res.status(200).json({ users: users });
});

router.get("/:username", async (req, res) => {
  try {
    const username = req.params.username;

    if (!username) {
      return res
        .status(400)
        .json({ message: "No username sent!", exists: false });
    }

    const user = await User.findOne({
      username: username.toLowerCase(),
    });

    if (!user) {
      return res.status(400).json({
        message: "No account with this username exists!",
        exists: false,
      });
    } else {
      return res.status(200).json({
        exists: true,
        user: {
          username: user.username,
        },
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  let session = req.session;
  return res.status(200).send(session);
});

router.post("/register", async (req, res) => {
  try {
    let reqUser = req.body;
    if (
      !reqUser.firstName ||
      !reqUser.lastName ||
      !reqUser.username ||
      !reqUser.phoneNumber ||
      !reqUser.password
    ) {
      return res.status(400).json({ message: "Empty Fields!" });
    }

    const userExistsUsername = await User.findOne({
      username: reqUser.username.toLowerCase(),
    });

    const userExistsPhoneNumber = await User.findOne({
      phoneNumber: reqUser.phoneNumber,
    });

    if (userExistsUsername) {
      return res
        .status(400)
        .json({ message: "Account with this username already exists." });
    }

    if (userExistsPhoneNumber) {
      return res
        .status(400)
        .json({ message: "Account with this phone number already exists." });
    }

    const bcryptSalt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(reqUser.password, bcryptSalt);

    const newUser = new User({
      firstName: reqUser.firstName,
      lastName: reqUser.lastName,
      username: reqUser.username.toLowerCase(),
      password: hashedPassword,
      phoneNumber: reqUser.phoneNumber,
      verified: false,
      joinedAt: new Date(),
    });
    await newUser.save();
    res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get("/status", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(403).json({ message: "User not authenticated" });
  }

  if (!req.user) {
    return res.status(403).json({ message: "User not found!" });
  }

  res.status(200).json(req.user);
});

// Logging out and destroying session: localhost:8080/users/logout
router.post("/logout", async (req, res) => {
  req.logout();

  res.clearCookie("connect.sid");
  return res.status(200).json({
    message: `User Session has been destroyed!`,
  });
});

function makeid(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.post("/accountVerify/new/", async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const username = req.body.username;

  const verificationCode = await VerificationCode.create({
    username,
    destinationNumber: `+1${phoneNumber}`,
    verificationCode: makeid(7),
    expires: new Date(new Date() + 15 * 60000),
  });

  await verificationCode.save();

  client.messages
    .create({
      body: `Here is your account verification passcode: ${verificationCode.verificationCode}. It expires in 15 minutes!`,
      from: process.env.TWILIO_TRIAL_NUMBER,
      to: `+1${phoneNumber}`,
    })
    .then((message) => {
      console.log(message.sid);
      res.status(200).json({ msg: "Success! Message Sent" });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(400).json({ message: "Message Failed to Send!" });
    });
  res.status(200).json({ message: "Success! Message Sent!" });
});

router.post("/verify", async (req, res) => {
  const verificationCode = req.body.verificationCode;
  const username = req.body.username;

  await VerificationCode.deleteOne({ verificationCode });

  const user = await User.updateOne({ username }, { verified: true });

  res.status(200).json(user);
});

module.exports = router;
