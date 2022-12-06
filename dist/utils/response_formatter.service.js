"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants/constants");
class ResponseFormatter {
    static getSuccessResponse(data) {
        return {
            data,
            message: constants_1.default.NETWORK.SUCCESS_CODES.SUCCESS.message,
            error: constants_1.default.NETWORK.SUCCESS_CODES.SUCCESS.code,
        };
    }
    static getInvalidParameterResponse(data) {
        return {
            data,
            message: constants_1.default.NETWORK.ERROR_CODES.INVALID_PARAMETER.message,
            error: constants_1.default.NETWORK.ERROR_CODES.INVALID_PARAMETER.code,
        };
    }
    static dbExceptionHandler(data, res) {
        return res.status(constants_1.default.NETWORK.HTTP_STATUS_CODE.InternalServerError), {
            error: constants_1.default.NETWORK.ERROR_CODES.DB_EXCEPTION.code,
            message: constants_1.default.NETWORK.ERROR_CODES.DB_EXCEPTION.message,
            data: {},
        };
    }
    static dbExceptionHandlerJSON(data, res) {
        res.status(constants_1.default.NETWORK.HTTP_STATUS_CODE.InternalServerError).json({
            error: constants_1.default.NETWORK.ERROR_CODES.DB_EXCEPTION.code,
            message: data.message,
            data: {},
        });
    }
    static notFoundException(data, res) {
        return res.status(constants_1.default.NETWORK.HTTP_STATUS_CODE.BadRequest).send({
            error: constants_1.default.NETWORK.ERROR_CODES.NOTFOUND_EXCEPTION.code,
            message: data.message,
            data: {},
        });
    }
    static badRequestException(data, res) {
        return res.status(constants_1.default.NETWORK.HTTP_STATUS_CODE.BadRequest).send({
            error: constants_1.default.NETWORK.ERROR_CODES.NOTFOUND_EXCEPTION.code,
            message: data.message,
            data: {},
        });
    }
}
exports.default = ResponseFormatter;
