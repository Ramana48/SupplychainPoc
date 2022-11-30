export default class Network {
    static readonly HTTP_STATUS_CODE = {
        OK: "200", // Standard response for successful HTTP requests.
        BadRequest: 400, //The server cannot or will not process the request due to an apparent client error
        Unauthorized: 401, // Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.
        Forbidden: 403, // The request contained valid data and was understood by the server, but the server is refusing action.
        NotFound: 404, // The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
        MethodNotAllowed: 405, // The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request
        RequestTimeout: 408,
        InternalServerError: 500,
        NotImplemented: 501,
        BadGateway: 502,
        ServiceUnavailable: 503,
        NoContent: 204 // The server successfully processed the request, and is not returning any content
    };

    static readonly VALUES = {
        MISSING_REQUEST_PARAM: "Required parameter is missing",
    };

    static readonly ERROR_CODES = {
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
    }

    static readonly SUCCESS_CODES = {
        SUCCESS: {
            message: "ok",
            code: "0",
        },
        UPDATE_USER: {
            message: 'User updated successfully',
        },
    };
    static readonly EXCEPTION_MESSAGES = {
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

    static readonly PASSWORD = '123456789';
}