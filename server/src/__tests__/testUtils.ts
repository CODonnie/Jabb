import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const connectTestDB = async () => {
  const uri = process.env.MONGO_TEST_URI;
  if (!uri) throw new Error("MONGO_TEST_URI not defined in .env");

  await mongoose.connect(uri);
  console.log("Connected to test database");
};

const disconnectTestDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  console.log("Disconnected from test database");
};

const clearTestDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
  console.log("Cleared test database");
};

export { connectTestDB, disconnectTestDB, clearTestDB };