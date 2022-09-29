// const { sequelize } = require("./src/models");
// sequelize.sync();
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8001;
app.listen(8000, () => console.log(`server running on port: ${port}`));
