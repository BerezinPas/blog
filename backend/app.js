require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes");

const PORT = 5050;
const app = express();
app.use(express.static(path.join(__dirname, "../fontend/dist")));

app.use(cookieParser());
app.use(express.json());
// app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api", routes);

app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../fontend/dist/index.html"));
});

mongoose
  .connect("mongodb://user:mongopass@localhost:27017/blog?authSource=admin")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}.....`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
