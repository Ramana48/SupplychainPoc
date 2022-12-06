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
const users_1 = require("../models/users");
const roles_enum_1 = require("../enums/roles.enum");
const privileges_enum_1 = require("../enums/privileges.enum");
const ObjectId = require('mongodb').ObjectID;
const axios = require('axios');
class BatchesService {
    addBatch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body['products'] = req.body.productId;
            delete req.body.productId;
            try {
                const batchResp = yield batches_1.default.insertMany([req.body]);
                console.log('batchResp Resp::', batchResp);
                let apiInput = req.body;
                apiInput['_id'] = batchResp[0]._id;
                apiInput['comment'] = '';
                console.log('apiInput Resp::', apiInput);
                const apiResp = yield axios.post(process.env.DEV_SERVER_HOST + '/createBatch', apiInput, {
                    headers: {
                        'user-role': 'supplier',
                    }
                });
                console.log('API Resp::', apiResp);
                if (!apiResp || apiResp === null || (apiResp === null || apiResp === void 0 ? void 0 : apiResp.status) != 200) {
                    yield batches_1.default.deleteOne({ _id: batchResp[0]._id });
                    utility_service_1.default.returnBadRequestException(req, res, constants_1.default.NETWORK.EXCEPTION_MESSAGES.BATCH.UNABLE_TO_PROCESS, {});
                    return;
                }
                return batchResp;
            }
            catch (error) {
                console.log('error Resp::', error);
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
                            _id: ObjectId(req.params.batchId)
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
                if (!user || user.length === 0 || user[0].role[0].name === roles_enum_1.RoleEums.SUPPLIER) {
                    utility_service_1.default.returnBadRequestException(req, res, constants_1.default.NETWORK.EXCEPTION_MESSAGES.BATCH.INVALID_ACCESS, {});
                    return;
                }
                const input = req.body;
                if (input.status.toLowerCase() != privileges_enum_1.privilegeEums.OTHER) {
                    input['comment'] = '';
                }
                const previousBatch = yield batches_1.default.findById({ _id: ObjectId(req.params.batchId) });
                const update = yield batches_1.default.findByIdAndUpdate({ _id: ObjectId(req.params.batchId) }, {
                    $set: input
                }, { new: true });
                if (!update || update === null || update.length === 0) {
                    utility_service_1.default.returnNotFoundException(req, res, constants_1.default.NETWORK.EXCEPTION_MESSAGES.BATCH.BATCH_NOT_FOUND, {});
                    return;
                }
                let apiInput = req.body;
                apiInput['_id'] = req.params.batchId;
                const apiResp = yield axios.post(process.env.DEV_SERVER_HOST + '/updateBatch', apiInput, {
                    headers: {
                        'user-role': user[0].role[0].name,
                    }
                });
                if (!apiResp || apiResp === null || (apiResp === null || apiResp === void 0 ? void 0 : apiResp.status) != 200) {
                    let apiInput = input;
                    Object.keys(apiInput).forEach(key => {
                        if (previousBatch[key]) {
                            apiInput[key] = previousBatch[key];
                        }
                    });
                    const update = yield batches_1.default.findByIdAndUpdate({ _id: ObjectId(req.params.batchId) }, {
                        $set: apiInput
                    }, { new: true });
                    utility_service_1.default.returnBadRequestException(req, res, constants_1.default.NETWORK.EXCEPTION_MESSAGES.BATCH.UNABLE_TO_PROCESS, {});
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
    fetchAllBatches(req, res) {
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
                if (!user || user.length === 0 || user[0].role[0].name === roles_enum_1.RoleEums.SUPPLIER) {
                    utility_service_1.default.returnBadRequestException(req, res, constants_1.default.NETWORK.EXCEPTION_MESSAGES.BATCH.INVALID_ACCESS, {});
                    return;
                }
                const batches = yield batches_1.default.find({ isAllOkay: false });
                if (!batches || batches === null || batches.length === 0) {
                    utility_service_1.default.returnNotFoundException(req, res, constants_1.default.NETWORK.EXCEPTION_MESSAGES.BATCH.BATCH_NOT_FOUND, {});
                    return;
                }
                return batches;
            }
            catch (error) {
                utility_service_1.default.returnDbException(req, res, constants_1.default.NETWORK.EXCEPTION_MESSAGES.BATCH.FETCH_ALL_BATCH, error);
                return;
            }
        });
    }
}
exports.default = BatchesService;
