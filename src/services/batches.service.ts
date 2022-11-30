import Constants from "../constants/constants";
import UtilityService from "../utils/utility.service";
import Batches from "../models/batches";
const ObjectId = require('mongodb').ObjectID;

export default class BatchesService {

    async addBatch(req, res) {
        req.body['product'] = req.body.productId;
        delete req.body.productId;
        try {
            return await Batches.insertMany([req.body]);
        } catch (error) {            
            UtilityService.returnDbException(req, res, error.message, error);
            return;
        }
    }

    async fetchBatchDetailsById(req, res) {
        try {
            const batchDetails = await Batches.aggregate(
                [
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
                UtilityService.returnNotFoundException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.BATCH_NOT_FOUND, {});
                return;
            }
            return batchDetails;
        } catch (error) {
            UtilityService.returnDbException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.CHNAGE_STATUS, error);
            return;
        }
    }

    async changeStatus(req, res) {
        try {
            const input = req.body;

            const update = await Batches.findByIdAndUpdate({ _id: ObjectId(req.params.batchId) }, {
                $set: input
            }, { new: true });

            if (!update || update === null || update.length === 0) {
                UtilityService.returnNotFoundException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.BATCH_NOT_FOUND, {});
                return;
            }
            return update;
        } catch (error) {
            UtilityService.returnDbException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.CHNAGE_STATUS, error);
            return;
        }
    }
}