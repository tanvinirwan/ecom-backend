const express=require("express");
const productRouter=express.Router();
const productController=require("../product/product.controller");
productRouter.get("/search",productController.searchProduct);

productRouter.get("/:slug",productController.getsingleProduct);
productRouter.get("/seller/mine",productController.getAllSellerProduct);
productRouter.patch("/:id",productController.updateProduct);
productRouter.delete("/:id",productController.deleteProduct);

//admin apis
productRouter.post("/:id",productController.updateProductStatus);
productRouter.post("/admin/all",productController.getAllProductsAdmin);


productRouter.post("/",productController.createProduct);


module.exports=productRouter;