const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connect = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to Database");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

  mongoose.connection.on("disconnected", () => {
    console.log("Database disconnected");
  });

  mongoose.connection.on("connected", () => {
    console.log("Database connected");
  });

module.exports = connect;
