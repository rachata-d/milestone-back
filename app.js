// const { sequelize } = require("./src/models");
// sequelize.sync();
// const { Admin } = require("./src/models");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const authRoute = require("./src/routes/authRoute");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoute);

const port = process.env.PORT || 8001;
app.listen(8000, () => console.log(`server running on port: ${port}`));

// INSERT INTO
// const run = async () => {
//   const res = await Admin.create({
//     firstName: "Johnny",
//     lastName: "Depp",
//     email: "a@gmail.com",
//     password: "$2a$12$zFgcAGAJ5i0WZ6iy3lLy0.ONyNy/bjsNZm6zL/FG.8A9KKSkXiexm",
//     address: "Mint Tower",
//   });
//   console.log(res);
// };

// run();
