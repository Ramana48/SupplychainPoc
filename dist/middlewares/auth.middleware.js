"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const utility_service_1 = require("../utils/utility.service");
const constants_1 = require("../constants/constants");
const response_formatter_service_1 = require("../utils/response_formatter.service");
class AuthenticatorMiddleware {
    static checkIfBodyParamsExistLoginApi(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield utility_service_1.default.validateRequest([
                (0, express_validator_1.body)("userName")
                    .exists()
                    .withMessage(constants_1.default.NETWORK.VALUES.MISSING_REQUEST_PARAM),
                (0, express_validator_1.body)("password")
                    .exists()
                    .withMessage(constants_1.default.NETWORK.VALUES.MISSING_REQUEST_PARAM),
            ], req);
            if (!errors.length) {
                return next();
            }
            res.status(400).json(response_formatter_service_1.default.getInvalidParameterResponse(errors));
        });
    }
    static checkIfBodyParamsExistBatchApi(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield utility_service_1.default.validateRequest([
                (0, express_validator_1.body)("userId")
                    .exists()
                    .withMessage(constants_1.default.NETWORK.VALUES.MISSING_REQUEST_PARAM),
                (0, express_validator_1.body)("latitude")
                    .exists()
                    .withMessage(constants_1.default.NETWORK.VALUES.MISSING_REQUEST_PARAM),
                (0, express_validator_1.body)("longitude")
                    .exists()
                    .withMessage(constants_1.default.NETWORK.VALUES.MISSING_REQUEST_PARAM),
                (0, express_validator_1.body)("productId")
                    .exists()
                    .withMessage(constants_1.default.NETWORK.VALUES.MISSING_REQUEST_PARAM),
                (0, express_validator_1.body)("quantity")
                    .exists()
                    .withMessage(constants_1.default.NETWORK.VALUES.MISSING_REQUEST_PARAM),
                (0, express_validator_1.body)("status")
                    .exists()
                    .withMessage(constants_1.default.NETWORK.VALUES.MISSING_REQUEST_PARAM),
            ], req);
            if (!errors.length) {
                return next();
            }
            res.status(400).json(response_formatter_service_1.default.getInvalidParameterResponse(errors));
        });
    }
    static checkIfBodyParamsExistFetchProductsApi(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield utility_service_1.default.validateRequest([
                (0, express_validator_1.header)("userId")
                    .exists()
                    .withMessage(constants_1.default.NETWORK.VALUES.MISSING_REQUEST_PARAM)
            ], req);
            if (!errors.length) {
                return next();
            }
            res.status(400).json(response_formatter_service_1.default.getInvalidParameterResponse(errors));
        });
    }
}
exports.default = AuthenticatorMiddleware;
