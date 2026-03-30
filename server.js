require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ✅ CREATE APP FIRST
const app = express();

// ✅ THEN USE MIDDLEWARES
app.use(express.json());
app.use(cors({ origin: "*" }));

// ✅ ROUTES
const jobRoutes = require("./routes/jobRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const adminRoutes = require("./routes/adminRoutes");
const applyRoutes = require("./routes/applyRoutes");

app.use("/api/jobs", jobRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/apply", require("./routes/applyRoutes"));
const applyRoutes = require("./routes/applyRoutes");
app.use("/api/apply", applyRoutes);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("YIREH Backend Running");
});

// ✅ DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ SERVER
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
