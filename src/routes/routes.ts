import { Application, Request, Response } from "express";
import userRoute from "./user.route";
import batchRoute from './batches.routes';
import productRoute from './products.routes';

module.exports = (app: Application) => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Welcome!!");
  });

  //User service route
  app.use("/user", userRoute);

  //Batch service route
  app.use("/batches", batchRoute);

  // Product service route
  app.use("/products", productRoute);
};