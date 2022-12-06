import ResponseInterface from "../interfaces/response.interface";
import Constants from "../constants/constants";
import DBExceptionInterface from "../interfaces/db_exception_interface";

export default class ResponseFormatter {
    public static getSuccessResponse(data: Object): ResponseInterface {
        return {
            data,
            message: Constants.NETWORK.SUCCESS_CODES.SUCCESS.message,
            error: Constants.NETWORK.SUCCESS_CODES.SUCCESS.code,
        };
    }
    public static getInvalidParameterResponse(
        data: Array<Object>
    ): ResponseInterface {
        return {
            data,
            message: Constants.NETWORK.ERROR_CODES.INVALID_PARAMETER.message,
            error: Constants.NETWORK.ERROR_CODES.INVALID_PARAMETER.code,
        };
    }
    public static dbExceptionHandler(data: DBExceptionInterface, res: any): ResponseInterface {
        return res.status(Constants.NETWORK.HTTP_STATUS_CODE.InternalServerError), {
            error: Constants.NETWORK.ERROR_CODES.DB_EXCEPTION.code,
            message: Constants.NETWORK.ERROR_CODES.DB_EXCEPTION.message,
            data: {},
        };
    }

    public static dbExceptionHandlerJSON(data: DBExceptionInterface, res: any) {
        res.status(Constants.NETWORK.HTTP_STATUS_CODE.InternalServerError).json({
            error: Constants.NETWORK.ERROR_CODES.DB_EXCEPTION.code,
            message: data.message,
            data: {},
        });
    }

    public static notFoundException(data: DBExceptionInterface, res: any): ResponseInterface {
        return res.status(Constants.NETWORK.HTTP_STATUS_CODE.BadRequest).send({
            error: Constants.NETWORK.ERROR_CODES.NOTFOUND_EXCEPTION.code,
            message: data.message,
            data: {},
        });
    }

    public static badRequestException(data: DBExceptionInterface, res: any): ResponseInterface {
        return res.status(Constants.NETWORK.HTTP_STATUS_CODE.BadRequest).send({
            error: Constants.NETWORK.ERROR_CODES.NOTFOUND_EXCEPTION.code,
            message: data.message,
            data: {},
        });
    }
}