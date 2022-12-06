import Constants from "../constants/constants";
import UtilityService from "../utils/utility.service";
import Batches from "../models/batches";
import User from "../models/users";
import { RoleEums } from "../enums/roles.enum";
import { privilegeEums } from "../enums/privileges.enum";
const ObjectId = require('mongodb').ObjectID;
const axios = require('axios');

export default class BatchesService {

    async addBatch(req, res) {
        req.body['products'] = req.body.productId;
        delete req.body.productId;
        try {
            const batchResp = await Batches.insertMany([req.body]);
            console.log('batchResp Resp::', batchResp);

            let apiInput = req.body;
            apiInput['_id'] = batchResp[0]._id;
            apiInput['comment'] = '';

            console.log('apiInput Resp::', apiInput);

            const apiResp = await axios.post(process.env.DEV_SERVER_HOST+'/createBatch', apiInput, {
                headers: {
                  'user-role': 'supplier',
                }
            });
            console.log('API Resp::', apiResp);
            if(!apiResp || apiResp === null || apiResp?.status != 200){
                await Batches.deleteOne({_id: batchResp[0]._id});

                UtilityService.returnBadRequestException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.UNABLE_TO_PROCESS, {});
                return;
            }
            
            return batchResp;
        } catch (error) {
            console.log('error Resp::', error);

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
                            _id: ObjectId(req.params.batchId)
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
                
            if (!user || user.length === 0 || user[0].role[0].name === RoleEums.SUPPLIER) {
                UtilityService.returnBadRequestException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.INVALID_ACCESS, {});
                return;
            }

            const input = req.body;
            if(input.status.toLowerCase() != privilegeEums.OTHER){
                input['comment'] = '';
            }

            const previousBatch = await Batches.findById({_id:ObjectId(req.params.batchId)});

            const update = await Batches.findByIdAndUpdate({ _id: ObjectId(req.params.batchId) }, {
                $set: input
            }, { new: true });

            if (!update || update === null || update.length === 0) {
                UtilityService.returnNotFoundException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.BATCH_NOT_FOUND, {});
                return;
            }

            let apiInput = req.body;
            apiInput['_id'] = req.params.batchId;


            const apiResp = await axios.post(process.env.DEV_SERVER_HOST+'/updateBatch', apiInput, {
                headers: {
                  'user-role': user[0].role[0].name,
                }
            });

            if(!apiResp || apiResp === null || apiResp?.status != 200){
                let apiInput = input;
                Object.keys(apiInput).forEach(key => {
                    if(previousBatch[key]){
                        apiInput[key] = previousBatch[key];
                    }
                });

                const update = await Batches.findByIdAndUpdate({ _id: ObjectId(req.params.batchId) }, {
                    $set: apiInput
                }, { new: true });
       

                UtilityService.returnBadRequestException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.UNABLE_TO_PROCESS, {});
                return;
            }

            return update;
        } catch (error) {            
            UtilityService.returnDbException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.CHNAGE_STATUS, error);
            return;
        }
    }

    async fetchAllBatches(req, res) {
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

            if (!user || user.length === 0 || user[0].role[0].name === RoleEums.SUPPLIER) {
                UtilityService.returnBadRequestException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.INVALID_ACCESS, {});
                return;
            }

            const batches = await Batches.find({ isAllOkay: false });

            if (!batches || batches === null || batches.length === 0) {
                UtilityService.returnNotFoundException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.BATCH_NOT_FOUND, {});
                return;
            }
            return batches;
        } catch (error) {
            UtilityService.returnDbException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.FETCH_ALL_BATCH, error);
            return;
        }
    }
}