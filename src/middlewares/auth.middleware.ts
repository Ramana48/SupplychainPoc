import { Request, Response, NextFunction } from "express";
import { ValidationError, header, body } from "express-validator";
import UtilityService from "../utils/utility.service";
import Constants from "../constants/constants";
import ResponseFormatter from "../utils/response_formatter.service";

export default class AuthenticatorMiddleware {
    static async checkIfBodyParamsExistLoginApi(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const errors: Array<ValidationError> = await UtilityService.validateRequest(
            [
                body("userName")
                    .exists()
                    .withMessage(Constants.NETWORK.VALUES.MISSING_REQUEST_PARAM),
                body("password")
                    .exists()
                    .withMessage(Constants.NETWORK.VALUES.MISSING_REQUEST_PARAM),
            ],
            req
        );
        if (!errors.length) {
            return next();
        }
        res.status(400).json(ResponseFormatter.getInvalidParameterResponse(errors));
    }

    static async checkIfBodyParamsExistBatchApi(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const errors: Array<ValidationError> = await UtilityService.validateRequest(
            [
                body("userId")
                    .exists()
                    .withMessage(Constants.NETWORK.VALUES.MISSING_REQUEST_PARAM),
                body("latitude")
                    .exists()
                    .withMessage(Constants.NETWORK.VALUES.MISSING_REQUEST_PARAM),
                body("longitude")
                    .exists()
                    .withMessage(Constants.NETWORK.VALUES.MISSING_REQUEST_PARAM),
                body("productId")
                    .exists()
                    .withMessage(Constants.NETWORK.VALUES.MISSING_REQUEST_PARAM),
                body("quantity")
                    .exists()
                    .withMessage(Constants.NETWORK.VALUES.MISSING_REQUEST_PARAM),
                body("status")
                    .exists()
                    .withMessage(Constants.NETWORK.VALUES.MISSING_REQUEST_PARAM),

            ],
            req
        );
        if (!errors.length) {
            return next();
        }
        res.status(400).json(ResponseFormatter.getInvalidParameterResponse(errors));
    }

    static async checkIfBodyParamsExistFetchProductsApi(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const errors: Array<ValidationError> = await UtilityService.validateRequest(
            [
                header("userId")
                    .exists()
                    .withMessage(Constants.NETWORK.VALUES.MISSING_REQUEST_PARAM)
            ],
            req
        );
        if (!errors.length) {
            return next();
        }
        res.status(400).json(ResponseFormatter.getInvalidParameterResponse(errors));
    }
}