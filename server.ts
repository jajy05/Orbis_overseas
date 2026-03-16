import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

app.use(cors());
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
  
  try {
     
    const lead = new Lead(req.body);
    await lead.save();

    res.json({
      success: true,
      message: "Lead saved successfully",
    });
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