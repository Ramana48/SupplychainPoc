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
const batches_service_1 = require("../services/batches.service");
const batchesService = new batches_service_1.default();
class BatchesController {
    addBatch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const batches = yield batchesService.addBatch(req, res);
            return res.json(batches);
        });
    }
    fetchBatch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const batches = yield batchesService.fetchBatchDetailsById(req, res);
            return res.json(batches);
        });
    }
    changeStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.get('userId').length === 0) {
                return res.status(400).send({ code: 0, message: 'UserId value should not be empty', data: {} });
            }
            const batches = yield batchesService.changeStatus(req, res);
            return res.json(batches);
        });
    }
    fetchBatches(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.get('userId').length === 0) {
                return res.status(400).send({ code: 0, message: 'UserId value should not be empty', data: {} });
            }
            const batches = yield batchesService.fetchAllBatches(req, res);
            return res.json(batches);
        });
    }
    fetchBatchByProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const batches = yield batchesService.fetchBatchDetailsByProductId(req, res);
            return res.json(batches);
        });
    }
}
exports.default = BatchesController;
