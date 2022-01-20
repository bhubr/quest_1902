const express = require("express");
const mongoose = require("mongoose");
const MessageModel = require("./MessageModel");

process.on("SIGINT", () => {
  console.log("Caught interrupt signal");
  process.exit();
});

process.on("SIGTERM", () => {
  console.log("Caught interrupt signal");
  process.exit();
});

const mongoHost = process.env.MONGO_HOST || 'mongodb';

const bootstrap = async () => {
  const app = express();
  app.use(express.json());

  console.log("Connecting to MongoDB");
  await mongoose.connect(`mongodb://${mongoHost}:27017/tom`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Connected");

  app.get("/", (req, res) => {
    console.log("Got a request");
    res.json({ message: "Hey, I'm Tom, the API" });
  });

  app.get("/posts", async (req, res) => {
    res.json(await MessageModel.find());
  });

  app.post("/", async (req, res) => {
    console.log("Got a post");
    const { sentence = "Hey I'm a new post!" } = req.body;
    const message = new MessageModel({ sentence });
    const result = await message.save();
    res.json({ message: "Hey, I saved a post", result });
  });

  console.log('app ready')

  return app;
};

module.exports = bootstrap;
