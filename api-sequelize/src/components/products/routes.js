const Router = require("express").Router;
const validatorHandler = require("../../middleware/validationHandler.js");
const { productsSchema } = require("../../schemas/product.schema.js");
const ProductController = require("./controller/ProductController.js");
const ProductRepository = require("./domain/ProductRepository.js");
const ProductService = require("./domain/ProductService.js");

const route = Router();

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

route.post(
  "/",
  validatorHandler(productsSchema, "body"),
  productController.createProduct.bind(productController)
);

route.get("/:id", productController.getOneProduct.bind(productController));
route.get("/", productController.getAllProducts.bind(productController));
route.delete("/:id", productController.deleteProduct.bind(productController));
route.put("/:id", productController.updateProduct.bind(productController));

module.exports = route;
