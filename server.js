const express = require("express");
const app = express();
require("./database/db")
const cors = require("cors");
require("dotenv").config();
const user = require("./routes/userRoute");

app.use(cors());
app.use(express.json());

app.use("/api", user);

app.listen(process.env.PORT, () => {
  console.log("listening at port ", process.env.PORT);
});
