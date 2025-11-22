import mongoose from "mongoose";
export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig();
  const uri = config.mongodbUri;
  if (!uri) {
    console.log("uri is missing");
    return;
  }
  //   if already connected do nothing
  if (mongoose.connection.readyState === 1) {
    return;
  }
  try {
    await mongoose.connect(uri);
    console.log("Connected To DataBase");
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
});
