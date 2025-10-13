const mongoose = require("mongoose");
const Insta = require("./models/Insta"); // შენს მოდელის ფაილის გზა
require("dotenv").config();

async function createInstaItem() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // მონაცემები, რასაც გინდა დაამატო
    const newItem = new Insta({
      image: "https://via.placeholder.com/500", // ტესტი URL, Cloudinary-ს გარეშე
      title: "Test Image",
      price: 50,
      link: "https://example.com"
    });

    await newItem.save();
    console.log("✅ Insta item created successfully:", newItem);

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error creating Insta item:", err.message);
    mongoose.connection.close();
  }
}

createInstaItem();
