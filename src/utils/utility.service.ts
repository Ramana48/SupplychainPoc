import { ValidationError, validationResult } from "express-validator";
import jwt = require("jsonwebtoken");
import DBExceptionInterface from "../interfaces/db_exception_interface";
import ResponseFormatter from "./response_formatter.service";

const crypto = require('crypto');


require("dotenv").config();

let algorithm = 'aes256';

export default class UtilityService {

  /**
  *
  * @param validations
  * @description Helper method to validate the request params and body
  */
  public static async validateRequest(
    validations,
    req
  ): Promise<Array<ValidationError>> {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return [];
    }
    return errors.array();
  }

  public static async returnDbException(req: any, res: any, message: string, exception: any) {
    let obj: DBExceptionInterface = {
      eventData: exception,
      message: message,
      requestId: "0",
    };
    ResponseFormatter.dbExceptionHandlerJSON(obj, res);
  }

  public static async returnNotFoundException(req: any, res: any, message: string, exception: any) {
    let obj: DBExceptionInterface = {
      eventData: exception,
      message: message,
      requestId: "0",
    };
    ResponseFormatter.notFoundException(obj, res);
  }

  public static async returnBadRequestException(req: any, res: any, message: string, exception: any) {
    let obj: DBExceptionInterface = {
      eventData: exception,
      message: message,
      requestId: "0",
    };
    ResponseFormatter.badRequestException(obj, res);
  }
}
