import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import emailjs from "@emailjs/nodejs";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://orbis-overseas.vercel.app"
  ],
  methods: ["GET", "POST"],
}));
app.use(express.json());


/* ------------------ MongoDB Connection ------------------ */

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ------------------ Schema ------------------ */

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  country: String,
  product: String,
  subject: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Lead = mongoose.model("Lead", leadSchema);

/* ------------------ Routes ------------------ */

// Save lead
app.post("/api/submit", async (req, res) => {
   const { name, email, phone, country, product, message } = req.body;
  
  try {
     
    const lead = new Lead(req.body);
    await lead.save();
    
    

    // Send email
     try {
    // 📩 1. Send to ADMIN (you)
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ADMIN!,
      {
        name,
        email,
        phone,
        country,
        product,
        message,
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY!,
        privateKey: process.env.EMAILJS_PRIVATE_KEY!,
      }
    );

    // 📩 2. Send to USER (auto reply)
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_USER!,
      {
        name,
        email,
        phone,
        country,
        product,
        message,
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY!,
        privateKey: process.env.EMAILJS_PRIVATE_KEY!,
      }
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ EmailJS Error:", err);
    res.status(500).json({ success: false });
  }
    
   
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving lead",
    });
  }
});

// Get all leads
app.get("/api/leads", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    res.json(leads);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching leads",
    });
  }
});

/* ------------------ Server ------------------ */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});