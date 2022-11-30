import * as express from "express";
import UserController from "../controllers/user.controller";
import AuthenticatorMiddleware from "../middlewares/auth.middleware";

const router = express.Router();
const userController = new UserController();


router.post("/login", AuthenticatorMiddleware.checkIfBodyParamsExistLoginApi,
    userController.userLogin);



export default router;
