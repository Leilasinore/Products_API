const db = require("../../models");

const Product = db.Product;

exports.findAllProducts = (req, res) => {
  Product.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findProductById = async (req, res) => {
  const id  = req.params.id;

  await Product.findByPk(id)
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      }
      res.status(404).send({message:`product not found by id ${id}`});
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `something wrong occured ${err.message}` });
    });
};

exports.createItem = (req,res)=>{

  if(!req.body.name || !req.body.quantity || !req.body.price){
    res.status(400).send({
      message:"content cannot be empty"
    });
    return
  }
  //create the product
  const product = {
    name:req.body.name,
    quantity:req.body.quantity,
    price:req.body.price,
    availability:req.body.availability
  }
  // save the product  to the database
  Product.create(product)
  .then(data=>{
    res.send(data)
  }
  )
  .catch(err=>{
    res.status(500).send({
      message: err.message || "some error occured while creating the product"
    })
  })
  


}
exports.updateItem =(req,res)=>{
  const id= req.params.id
  Product.update(req.body,{
    where:{id:id}
  })
  .then(
    data=>{
      if(data){
        res.send({
          message:"product updated successfully"
          
        } )
        
      }else{
        res.send({
          message:"failed to update product" 
        })
      }
    }
  )
  .catch(err=>{
    res.status(500).send({
      message: `Error updating product with id ${id}`
    });
  })
}

exports.deleteItem=(req,res)=>{
const id =req.params.id

Product.destroy({
   where:{ id:id}
})
.then(num=>{
  if(num == 1){
   res.send({message:"product deleted successfully"})
  }
  else{
    res.send({message:"Failed to delete product "})
  }
})
.catch(err=>{
  res.send({message:`Couldn't find object with id ${id}`})
})
}
