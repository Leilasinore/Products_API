const express = require("express");
const db= require('./models')
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync().then(()=>{
    console.log('synced db')
}).catch((err)=>{
    console.log(`unable to connect db ${err.message}`)
})


app.get("/", (req, res) => {
  res.json({ message: "welcome home" });
});

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

