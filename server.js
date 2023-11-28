const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require(`./app`);
const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

console.log(DB);
//For connecting our Express Application with the Database.
mongoose.connect(DB).then((con) => {
  console.log("DB connection successful");
});

const PORT = process.env.PORT || 3000;

// Start the Server
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
