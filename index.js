const express = require("express");

const cors = require("cors");
const server = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://tejash_agrawal:Pd84AnTryB8jtGvX@applab.vugxkg7.mongodb.net/test");
  console.log("db connected");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const userSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
});

const User = mongoose.model("User", userSchema);

server.use(cors());
server.use(bodyParser.json());

server.post("/test", async (req, res) => {
  let user = new User();
  
  user.title = req.body.title;
  user.content = req.body.content;
  user.category = req.body.category;
  const doc = await user.save();
  // const doc = await user.save();
  console.log(doc);
  res.json(doc);
});

server.get("/test", async (req, res) => {
  const docs = await User.find({});
  res.json(docs);
});

server.listen(8080, () => console.log("server started"));
// mongoose.connection.dropDatabase();
