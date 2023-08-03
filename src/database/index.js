import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://nextjs-firebase:monmon16@cluster0.ipcshmp.mongodb.net/";
  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("ecommerce database connected successfully"))
    .catch((err) =>
      console.error(`getting error from DB connection ${err.message}`)
    );
};

export default connectToDB;
