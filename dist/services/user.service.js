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
const constants_1 = require("../constants/constants");
const users_1 = require("../models/users");
const utility_service_1 = require("../utils/utility.service");
class UserService {
    userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userName = req.body.userName;
                const password = req.body.password;
                if (password != constants_1.default.NETWORK.PASSWORD) {
                    return res.status(400).send({ message: 'Invalid password' });
                }
                const user = yield users_1.default.aggregate([
                    { $unwind: "$roles" },
                    {
                        $lookup: {
                            from: "roles",
                            localField: "roles",
                            foreignField: "_id",
                            pipeline: [
                                { "$project": { "_id": 1, "name": 1, "verificationStatus": 1 } }
                            ],
                            as: "role"
                        }
                    },
                    {
                        $match: {
                            name: userName
                        }
                    }
                ]);
                if (!user || user.length === 0) {
                    utility_service_1.default.returnNotFoundException(req, res, constants_1.default.NETWORK.EXCEPTION_MESSAGES.USER.USER_NOT_FOUND, {});
                    return;
                }
                if (!user[0].role || user[0].role.length === 0) {
                    return res.status(constants_1.default.NETWORK.HTTP_STATUS_CODE.BadRequest).send({
                        error: '5',
                        message: 'Not a valid user',
                        data: {},
                    });
                }
                return user;
            }
            catch (error) {
                utility_service_1.default.returnDbException(req, res, constants_1.default.NETWORK.EXCEPTION_MESSAGES.USER.USER_LOGIN, error);
                return;
            }
        });
    }
}
exports.default = UserService;
