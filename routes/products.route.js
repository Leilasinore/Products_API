
module.exports=(app)=>{
  const products = require("../Controllers/products/Index");

  const router = require("express").Router();
  router.get("/", products.findAllProducts);

  router.get("/:id", products.findProductById);

  router.post("/", products.createItem);

  router.put("/:id", products.updateItem);

  
  router.delete("/:id", products.deleteItem);

  // Delete all products
  //router.delete("/", products.deleteAll);

  app.use("/api/products", router);

}
