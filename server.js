require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

// ROUTES
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/internships", require("./routes/internshipRoutes"));
app.use("/api/apply", require("./routes/applyRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.get("/", (req, res) => {
  res.send("YIREH Backend Running");
});

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("MongoDB Connected"))
  .catch(err=>console.log(err));

const PORT = process.env.PORT || 10000;

app.listen(PORT, ()=>console.log("Server running"));
