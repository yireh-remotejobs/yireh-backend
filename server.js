// ===== IMPORTS =====
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ===== APP INIT =====
const app = express();

// ===== MIDDLEWARE =====
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
}));
app.use(express.json({ limit: "10mb" })); // for logo base64

// ===== DB CONNECT =====
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log("DB Error:", err));

// ===== ROUTES IMPORT =====
const jobRoutes = require("./routes/jobRoutes");
const applyRoutes = require("./routes/applyRoutes");
const adminRoutes = require("./routes/adminRoutes");

// ===== ROUTES USE =====
app.use("/api/jobs", jobRoutes);
app.use("/api/apply", applyRoutes);
app.use("/api/admin", adminRoutes);

// ===== TEST ROUTE =====
app.get("/", (req,res)=>{
  res.send("API Running...");
});

// ===== START SERVER =====
const PORT = process.env.PORT || 10000;

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
});
