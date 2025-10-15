// scripts/cloudinary-test.js
const { v2: cloudinary } = require("cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function test() {
  try {
    // uploads a small sample image from web (Cloudinary demo image)
    const res = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/sample.jpg", { folder: "trendwear-test" });
    console.log("OK:", res.secure_url);
  } catch (err) {
    console.error("ERR:", err);
  }
}

test();
