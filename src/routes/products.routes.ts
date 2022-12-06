import * as express from "express";
import ProductsController from "../controllers/products.controller";
import AuthenticatorMiddleware from "../middlewares/auth.middleware";

const router = express.Router();
const productsController = new ProductsController();


router.get("/", AuthenticatorMiddleware.checkIfBodyParamsExistFetchProductsApi,
    productsController.fetchProducts);


export default router;
