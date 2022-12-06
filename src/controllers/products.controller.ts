import { Request, Response } from "express";
import ProductsService from "../services/products.service";

const productsService = new ProductsService();

export default class ProductsController {

    async fetchProducts(req: Request, res: Response) {
        if (req.get('userId').length === 0) {
            return res.status(400).send({ code: 0, message: 'UserId value should not be empty', data: {} });
        }

        const products = await productsService.fetchAllProducts(req, res);
        return res.json(products);
    }
}