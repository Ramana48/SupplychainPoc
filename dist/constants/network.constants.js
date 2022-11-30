"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Network {
}
exports.default = Network;
Network.HTTP_STATUS_CODE = {
    OK: "200",
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    RequestTimeout: 408,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    NoContent: 204 // The server successfully processed the request, and is not returning any content
};
Network.VALUES = {
    MISSING_REQUEST_PARAM: "Required parameter is missing",
};
Network.ERROR_CODES = {
    INVALID_PARAMETER: {
        message: "Invalid/Missing Parameter",
        code: "1",
    },
    USER: {
        UL01: {
            code: "UL01",
            message: "Invalid User and/or Password"
        },
        UL02: {
            code: "UL02",
            message: "User not found."
        },
    },
    DB_EXCEPTION: {
        message: "DB Exception",
        code: "3",
    },
    NOTFOUND_EXCEPTION: {
        message: "NOT Found",
        code: "4",
    },
};
Network.SUCCESS_CODES = {
    SUCCESS: {
        message: "ok",
        code: "0",
    },
    UPDATE_USER: {
        message: 'User updated successfully',
    },
};
Network.EXCEPTION_MESSAGES = {
    USER: {
        USER_LOGIN: "Exception while user login",
        USER_NOT_FOUND: "User not found"
    },
    BATCH: {
        ADD_BATCH: "Exception while adding batch",
        FETCH_BATCH: "Exception while fetching batch",
        CHNAGE_STATUS: "Exception while changing status",
        BATCH_NOT_FOUND: "Batch not found",
    }
};
Network.PASSWORD = '123456789';
