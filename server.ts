import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import nodemailer from "nodemailer";


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

const transporter = nodemailer.createTransport({
 host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
});
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Transporter error:", error);
  } else {
    console.log("✅ Email server is ready");
  }
});

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
     const { name, email, phone, country, product, message } = req.body;

    // Send email
      (async () => {
    try {
  const info = await transporter.sendMail({
    from:`"Orbis Overseas" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // 👈 send to admin
    subject: "🚀 New Export Inquiry Received",
    html: `<h2>New Buyer Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Product:</strong> ${product}</p>
      
        <p><strong>Message:</strong> ${message}</p>`,
  });




    
await transporter.sendMail({
  from: `"Orbis Overseas" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "📦 Inquiry Received - Orbis Overseas",
  html: `

<div style="background:#f5f5f5; padding:40px 0; font-family: 'Helvetica Neue', Arial, sans-serif;">

  <div style="max-width:620px; margin:auto; background:#ffffff; padding:40px 35px; border-radius:6px; box-shadow:0 4px 20px rgba(0,0,0,0.05);">

    <!-- Top Branding -->
    <div style="text-align:center; margin-bottom:30px;">
      <img src="https://res.cloudinary.com/dkfyvkaht/image/upload/f_auto,q_auto/logofinal_ualsfl" 
           style="width:140px; margin-bottom:10px;" />
    </div>

    <!-- Divider -->
    <div style="height:1px; background:#eaeaea; margin:20px 0;"></div>

    <!-- Heading -->
    <h2 style="font-size:20px; font-weight:500; color:#111; margin-bottom:10px;">
      Inquiry Received
    </h2>

    <p style="font-size:14px; color:#555; line-height:1.7;">
      Dear <strong>${name}</strong>,<br/><br/>
      Thank you for reaching out to <strong>Orbis Overseas</strong>.  
      Your inquiry has been successfully received and is currently under review by our team.
    </p>

    <!-- Elegant Gold Line -->
    <div style="width:50px; height:2px; background:#b38b2d; margin:25px 0;"></div>

    <!-- Details -->
    <div style="font-size:13px; color:#444; line-height:1.8;">
      <p><strong>Submitted Details:</strong></p>
      <p style="margin:5px 0;">Name: ${name}</p>
      <p style="margin:5px 0;">Email: ${email}</p>
      <p style="margin:5px 0;">Country: ${country}</p>
      <p style="margin:5px 0;">Product: ${product || "—"}</p>
      <p style="margin:5px 0;">Message: ${message}</p>
    </div>

    <!-- CTA -->
    <div style="margin:35px 0;">
      <a href="https://wa.me/918669594929" 
         style="display:inline-block; padding:12px 22px; border:1px solid #b38b2d; color:#b38b2d; text-decoration:none; font-size:13px; letter-spacing:1px;">
         CONTACT US
      </a>
    </div>

    <!-- Closing -->
    <p style="font-size:13px; color:#555; line-height:1.7;">
      We appreciate your interest and look forward to assisting you with premium quality rice exports.
    </p>

    <!-- Footer -->
    <div style="margin-top:40px; padding-top:20px; border-top:1px solid #eee; font-size:11px; color:#888; text-align:center;">
       <img src="https://res.cloudinary.com/dkfyvkaht/image/upload/f_auto,q_auto/logofinal_ualsfl" 
            style="width:100px; margin-bottom:10px;" />
      <p style="margin:3px 0;">Amgaon, Maharashtra, India</p>
      <p style="margin:3px 0;">orbisoverseas00@gmail.com </p>
        <p style="margin:3px 0;">+91 8669594929</p>
    </div>

  </div>

</div>

  `,
});
} catch (err) {
  console.error("❌ Email FAILED:", err);
}  })();
    
   
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