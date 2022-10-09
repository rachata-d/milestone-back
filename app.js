// const { sequelize } = require("./src/models");
// sequelize.sync({ alter: true });
const { Admin, Category } = require("./src/models");

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const authRoute = require("./src/routes/authRoute");
const authenticateAdmin = require("./src/middlewares/authenticateAdmin");
const itemRoute = require("./src/routes/itemRoute");
const authenticate = require("./src/middlewares/authenticate");
const lotRoute = require("./src/routes/lotRoute");
const getLotRoute = require("./src/routes/getLotRoute");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoute);
app.use("/login", authenticate);
app.use("/post", authenticateAdmin, itemRoute);
app.use("/items", itemRoute);
app.use("/postlot", authenticateAdmin, lotRoute);
app.use("/getlot", getLotRoute);

const port = process.env.PORT || 8001;
app.listen(8000, () => console.log(`server running on port: ${port}`));

// INSERT INTO
// const run = async () => {
//   const res = await Category.bulkCreate([
//     { name: "Antiques" },
//     { name: "Art" },
//     { name: "Utensil" },
//     { name: "Furniture" },
//     { name: "Decoration" },
//   ]);
//   console.log(res);
// };

// run();
