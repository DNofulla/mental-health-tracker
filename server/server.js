const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT | 8080;
const cors = require("cors");
const mongoose = require("mongoose");

/* Routes */
const usersRoute = require("./routes/User");
const postsRoute = require("./routes/Post");

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");

/* Passport Strategy */
require("./strategies/local");

const connectMongo = async () => {
  return await mongoose.connect(
    process.env.MONGO_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (error) throw error;
      console.log(`Connected to MongoDB Database!`);
    },
  );
};

connectMongo();

const store = new MongoDBStore({
  uri: process.env.MONGO_CONNECTION_STRING,
  collection: "sessions",
  expires: 1000 * 60 * 60 * 24 * 30,
});
store.on("error", (error) => console.log(error));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.text());

app.use(
  session({
    secret: process.env.SECRET,
    cookie: {
      // maxAge: 1 * 365 * 24 * 60 * 60 * 1000, // 1 Year
      maxAge: 1000 * 60 * 60 * 24 * 30, // 14 Days
    },
    saveUninitialized: false,
    resave: false,
    store,
  }),
);

app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "*",
    allowedHeaders: ["Authorization", "Origin", "Content-Type", "Accept"],
    credentials: true,
  }),
);

app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the Mental Health Tracker Back End REST API!",
  });
});

/* Routes */
app.use("/users", usersRoute);
app.use("/posts", postsRoute);

app.listen(port, () => {
  console.log(`Mental Health Tracker Back End Server running at Port ${port}!`);
});
