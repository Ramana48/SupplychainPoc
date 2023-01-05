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
        req.body['accountId'] = req.body.accountId ? req.body.accountId : "";
        delete req.body.productId;
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
                            _id: ObjectId(req.body.userId)
                        }
                    }
                ]
            );
            
            const exists = await this.checkValueExistsOrNot(user[0].role,RoleEums.TECHNICALUSER);
            
            if (!user || user.length === 0 || !exists) {
                UtilityService.returnBadRequestException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.INVALID_USER, {});
                return;
            }

            const isBatchExists = await Batches.findOne({
                userId: ObjectId(req.body.userId),
                products: ObjectId(req.body.products),
                batchId: req.body.batchId
            });

            if (isBatchExists || isBatchExists != null) {
                let dbStatus = isBatchExists?.status?.split(" ").join("");

                if (dbStatus != "rejected") {

                    if (dbStatus != privilegeEums.CONSUMED.split(" ").join("")) {
                        UtilityService.returnBadRequestException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.BATCH_EXISTS, {});
                        return;
                    }
                }
            }

            const batchResp = await Batches.insertMany([req.body]);

            let apiInput = req.body;
            apiInput['_id'] = req.body.batchId;
            apiInput['comment'] = '';

            try {
                const apiResp = await axios.post(process.env.DEV_SERVER_HOST + '/createBatch', apiInput, {
                    headers: {
                        'user-role': 'technicaluser',
                    }
                });
                if (!apiResp || apiResp === null || apiResp?.status != 200) {
                    await Batches.deleteOne({ _id: batchResp[0]._id });
    
                    UtilityService.returnBadRequestException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.UNABLE_TO_PROCESS, {});
                    return;
                }
            } catch (error) {
                console.log('Error::',error);
            }
            
            return batchResp;
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
                            batchId: req.params.batchId
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
            
            const roleName = req.get('roleName').toLowerCase();

            if(!Object.values(RoleEums).includes(roleName)){
                UtilityService.returnBadRequestException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.INVALID_USER_ROLE, {});
                return;
            } 
            
            if (!user || user.length === 0) {
                UtilityService.returnBadRequestException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.USER.USER_NOT_FOUND, {});
                return;
            }

            const exists = await this.checkValueExistsOrNot(user[0].role,RoleEums.TECHNICALUSER);
            if (exists) {
                UtilityService.returnBadRequestException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.INVALID_ACCESS, {});
                return;
            }

            const input = req.body;
            if (input.status.toLowerCase() != privilegeEums.OTHER) {
                input['comment'] = '';
            }

            if (input.status.toLowerCase() === 'rejected') {
                input['rejectedById'] = user[0]._id;
                input['rejectedByName'] = roleName;
            }

            const previousBatch = await Batches.findOne({ batchId: req.params.batchId });
            
            let dbStatus = previousBatch?.status?.split(" ").join("");


            if (dbStatus === privilegeEums.CONSUMED.split(" ").join("")) {
                UtilityService.returnBadRequestException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.BATCH_COMPLETED, {});
                return;
            }

            if (previousBatch.status === "rejected") {
                let rejectedby = previousBatch.rejectedByName
                UtilityService.returnBadRequestException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.BATCH_REJECTED.concat(" ", rejectedby), {});
                return;
            }

            // Fetch consumption number
            if(input.status === privilegeEums.CONSUMED){
                const batchConsumpation = await Batches.find({status: privilegeEums.CONSUMED}).sort({consumptionNo: -1}).limit(1);
                console.log('batchConsumpation:::',batchConsumpation);
                let consumptionNo = 0;
                if(batchConsumpation && batchConsumpation.length==0){
                    consumptionNo = 1;
                } else {
                    consumptionNo = batchConsumpation[0].consumptionNo+1;
                }
                input['consumptionNo'] = consumptionNo;
            }

            if(!Object.values(privilegeEums).includes(input.status.toLowerCase())){
                UtilityService.returnBadRequestException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.INVALID_STATUS, {});
                return;
            }

            const update = await Batches.updateOne({ batchId: req.params.batchId }, {
                $set: input
            }, { new: true });
            
            if (!update || update === null) {
                UtilityService.returnNotFoundException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.BATCH_NOT_FOUND, {});
                return;
            }

            let apiInput = req.body;
            apiInput['_id'] = req.params.batchId;
            try {
                const apiResp = await axios.post(process.env.DEV_SERVER_HOST + '/updateBatch', apiInput, {
                    headers: {
                        'user-role': roleName,
                    }
                });
    
                if (!apiResp || apiResp === null || apiResp?.status != 200) {
                    let apiInput = input;
                    Object.keys(apiInput).forEach(key => {
                        if (previousBatch[key]) {
                            apiInput[key] = previousBatch[key];
                        }
                    });
    
                    const update = await Batches.updateOne({ batchId: req.params.batchId }, {
                        $set: apiInput
                    }, { new: true });
    
    
                    UtilityService.returnBadRequestException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.UNABLE_TO_PROCESS, {});
                    return;
                }
            } catch (error) {
                console.log('Error::',error);
            }
            

            const _batch = await Batches.findOne({ batchId: req.params.batchId });

            // If consumer then call rebate api
            if(roleName === RoleEums.BUILDER){
                const rebateResp = await this.callRebateAPI(_batch);
            }

            return _batch;
        } catch (error) {
            console.log('error::',error);
            
            UtilityService.returnDbException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.CHNAGE_STATUS, error);
            return;
        }
    }

    async returnOrg(status) {
        let org = "";
        switch(status){
            case privilegeEums.MANUFACTURED:
                org = RoleEums.MANUFACTURER
                break;
                case privilegeEums.SHIPPED:
                    org = RoleEums.SHIPPER
                break;
                case privilegeEums.CONSUMED:
                    org = RoleEums.BUILDER
                break;
                default:
                    org = RoleEums.TECHNICALUSER
                    break;
        }
        return org
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
                            _id: ObjectId(req.get('userId').toString()),
                            status: {
                                $ne: 'rejected'
                            }
                        }
                    }
                ]
            );

            const exists = await this.checkValueExistsOrNot(user[0].role,RoleEums.MANUFACTURER);

            if (!user || user.length === 0 || exists) {
                UtilityService.returnBadRequestException(req, res, Constants.NETWORK.EXCEPTION_MESSAGES.BATCH.INVALID_ACCESS, {});
                return;
            }

            const batches = await Batches.find({ isAllOkay: false, status: { $ne: 'rejected' } });

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

    async fetchBatchDetailsByProductId(req, res) {
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
                            products: ObjectId(req.params.productId),
                            status: {
                                $ne: 'rejected'
                            }
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

    private async callRebateAPI(batch){
        try {
            const token = `${process.env.REBATE_AUTHORIZATION_USER}:${process.env.REBATE_AUTHORIZATION_PASSWORD}`;
            const encodedToken = Buffer.from(token).toString('base64');
            const apiInput = await this.constructInputForConsumptionAPI(batch);
            
            const apiResp = await axios.post(process.env.REBATE_API, apiInput, {
                headers: {
                    'Authorization': 'Basic ' + encodedToken
                }
            });
            return apiResp;
        } catch (error) {
            console.log('Error::',error);
        }
    }

    private async constructInputForConsumptionAPI(batch){
        
        let obj = {
            'z_AccountID': batch.accountId,
            "z_Date": new Date(),
            "z_RowNum": batch.consumptionNo,
            "z_ProductID": batch.products[0].toString(),
            "z_LotID": batch.batchId
        };
        return {RebateRelease: obj}
    }

    private async checkValueExistsOrNot(json, value){
        for(let a = 0; a< json.length;a++){
            if(json[a].name.toLowerCase() === value.toLowerCase()){
                return true;
            }
        }
    }
}