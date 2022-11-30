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
const batches_1 = require("../models/batches");
const ObjectId = require('mongodb').ObjectID;
class BatchesService {
    addBatch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body['product'] = req.body.productId;
            delete req.body.productId;
            try {
                return yield batches_1.default.insertMany([req.body]);
            }
            catch (error) {
                utility_service_1.default.returnDbException(req, res, error.message, error);
                return;
            }
        });
    }
    fetchBatchDetailsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batchDetails = yield batches_1.default.aggregate([
                    { $unwind: "$products" },
                    {
                        $lookup: {
                            from: "products",
                            localField: "products",
                            foreignField: "_id",
                            pipeline: [
                                { "$project": { "_id": 1, "name": 1 } }
                            ],
                            as: "product"
                        }
                    },
                    {
                        $match: {
                            _id: ObjectId(req.params.batchId),
                            isAllOkay: true
                        }
                    }
                ]);
                if (!batchDetails || batchDetails === null || batchDetails.length === 0) {
                    utility_service_1.default.returnNotFoundException(req, res, constants_1.default.NETWORK.EXCEPTION_MESSAGES.BATCH.BATCH_NOT_FOUND, {});
                    return;
                }
                return batchDetails;
            }
            catch (error) {
                utility_service_1.default.returnDbException(req, res, constants_1.default.NETWORK.EXCEPTION_MESSAGES.BATCH.CHNAGE_STATUS, error);
                return;
            }
        });
    }
    changeStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = req.body;
                const update = yield batches_1.default.findByIdAndUpdate({ _id: ObjectId(req.params.batchId) }, {
                    $set: input
                }, { new: true });
                if (!update || update === null || update.length === 0) {
                    utility_service_1.default.returnNotFoundException(req, res, constants_1.default.NETWORK.EXCEPTION_MESSAGES.BATCH.BATCH_NOT_FOUND, {});
                    return;
                }
                return update;
            }
            catch (error) {
                utility_service_1.default.returnDbException(req, res, constants_1.default.NETWORK.EXCEPTION_MESSAGES.BATCH.CHNAGE_STATUS, error);
                return;
            }
        });
    }
}
exports.default = BatchesService;
