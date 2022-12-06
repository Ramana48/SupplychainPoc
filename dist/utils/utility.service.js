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
const response_formatter_service_1 = require("./response_formatter.service");
const crypto = require('crypto');
require("dotenv").config();
let algorithm = 'aes256';
class UtilityService {
    /**
    *
    * @param validations
    * @description Helper method to validate the request params and body
    */
    static validateRequest(validations, req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(validations.map((validation) => validation.run(req)));
            const errors = (0, express_validator_1.validationResult)(req);
            if (errors.isEmpty()) {
                return [];
            }
            return errors.array();
        });
    }
    static returnDbException(req, res, message, exception) {
        return __awaiter(this, void 0, void 0, function* () {
            let obj = {
                eventData: exception,
                message: message,
                requestId: "0",
            };
            response_formatter_service_1.default.dbExceptionHandlerJSON(obj, res);
        });
    }
    static returnNotFoundException(req, res, message, exception) {
        return __awaiter(this, void 0, void 0, function* () {
            let obj = {
                eventData: exception,
                message: message,
                requestId: "0",
            };
            response_formatter_service_1.default.notFoundException(obj, res);
        });
    }
    static returnBadRequestException(req, res, message, exception) {
        return __awaiter(this, void 0, void 0, function* () {
            let obj = {
                eventData: exception,
                message: message,
                requestId: "0",
            };
            response_formatter_service_1.default.badRequestException(obj, res);
        });
    }
}
exports.default = UtilityService;
