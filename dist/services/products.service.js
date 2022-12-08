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
const utility_service_1 = require("../utils/utility.service");
const products_1 = require("../models/products");
const users_1 = require("../models/users");
const roles_enum_1 = require("../enums/roles.enum");
const ObjectId = require('mongodb').ObjectID;
class ProductsService {
    fetchAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield users_1.default.aggregate([
                    { $unwind: "$roles" },
                    {
                        $lookup: {
                            from: "roles",
                            localField: "roles",
                            foreignField: "_id",
                            pipeline: [
                                { "$project": { "_id": 1, "name": 1, "privileges": 1 } }
                            ],
                            as: "role"
                        }
                    },
                    {
                        $match: {
                            _id: ObjectId(req.get('userId').toString())
                        }
                    }
                ]);
                if (!user || user.length === 0 || user[0].role[0].name != roles_enum_1.RoleEums.MANUFACTURER) {
                    utility_service_1.default.returnBadRequestException(req, res, constants_1.default.NETWORK.EXCEPTION_MESSAGES.PRODUCT.INVALID_ACCESS, {});
                    return;
                }
                const products = yield products_1.default.find({});
                if (!products || products === null || products.length === 0) {
                    utility_service_1.default.returnNotFoundException(req, res, constants_1.default.NETWORK.EXCEPTION_MESSAGES.PRODUCT.PRODUCTS_NOT_FOUND, {});
                    return;
                }
                return products;
            }
            catch (error) {
                utility_service_1.default.returnDbException(req, res, constants_1.default.NETWORK.EXCEPTION_MESSAGES.PRODUCT.FETCH_PRODUCTS, error);
                return;
            }
        });
    }
}
exports.default = ProductsService;
