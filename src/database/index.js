import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl = process.env.MONGODB_URI;
  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("ecommerce database connected successfully"))
    .catch((err) =>
      console.error(`getting error from DB connection ${err.message}`)
    );
};

export default connectToDB;
