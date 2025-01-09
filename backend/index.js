const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://sunny:sunny@cluster0.czoop.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {

}).then(() => {
  console.log("MongoDB Connected");
}).catch((err) => console.log(err));

const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
