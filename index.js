const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");

const db= require('./models')
require("dotenv").config();

const app = express();

//app.use(),express.json() and express.urlencoded() are middleware functions in express that perform different roles 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync().then(()=>{
    console.log('synced db')
}).catch((err)=>{
    console.log(`unable to connect db ${err.message}`)
})


const PORT = process.env.APP_PORT;
require("./routes/products.route")(app);
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce-Products Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple Products API  made with ExpressJS and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        email: "leilasinore@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4000/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const spacs =swaggerJsdoc(options)
app.use("/api-docs",swaggerui.serve,swaggerui.setup(spacs))
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

