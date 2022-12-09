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
    USER_ID_PARAM_VALUE: "UserId params value is missing",
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
    BAD_REQUEST_EXCEPTION: {
        message: "Badrequest",
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
        FETCH_ALL_BATCH: "Exception while fetching batches",
        INVALID_ACCESS: "Technical-user not authorised to change the batch status",
        UNABLE_TO_PROCESS: "Unable to process batch transaction into blockchain",
        BATCH_EXISTS: "This user has already initiated a batch for this product id",
        INVALID_USER: "Only technical-user is authorised to add the product into batch",
        BATCH_REJECTED: "This batch Id is already rejected by",
        BATCH_COMPLETED: "This batch Id is already delivered to the consumer"
    },
    PRODUCT: {
        PRODUCTS_NOT_FOUND: "Products not found",
        FETCH_PRODUCTS: "Exception while fetching products",
        INVALID_ACCESS: "Not authorised to access products",
    }
};
Network.PASSWORD = '123456789';
