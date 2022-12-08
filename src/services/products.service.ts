import Constants from "../constants/constants";
import UtilityService from "../utils/utility.service";
import Products from "../models/products";
import User from "../models/users";
import { RoleEums } from "../enums/roles.enum";
const ObjectId = require('mongodb').ObjectID;

export default class ProductsService {

    async fetchAllProducts(req, res) {
        try {

            const user = await User.aggregate(
                [
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
                ]
            );

            if (!user || user.length === 0 || user[0].role[0].name != RoleEums.MANUFACTURER) {
                UtilityService.returnBadRequestException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.PRODUCT.INVALID_ACCESS, {});
                return;
            }

            const products = await Products.find({});

            if (!products || products === null || products.length === 0) {
                UtilityService.returnNotFoundException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.PRODUCT.PRODUCTS_NOT_FOUND, {});
                return;
            }
            return products;
        } catch (error) {
            UtilityService.returnDbException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.PRODUCT.FETCH_PRODUCTS, error);
            return;
        }
    }
}