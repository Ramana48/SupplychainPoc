import { Request, Response } from "express";
import BatchesService from "../services/batches.service";

const batchesService = new BatchesService();

export default class BatchesController {
  async addBatch(req: Request, res: Response) {

    const batches = await batchesService.addBatch(req, res);
    return res.json(batches);
  }

  async fetchBatch(req: Request, res: Response) {

    const batches = await batchesService.fetchBatchDetailsById(req, res);
    return res.json(batches);
  }

  async changeStatus(req: Request, res: Response) {
    if (req.get('userId').length === 0) {
      return res.status(400).send({ code: 0, message: 'UserId value should not be empty', data: {} });
    }

    const batches = await batchesService.changeStatus(req, res);
    return res.json(batches);
  }

  async fetchBatches(req: Request, res: Response) {
    if (req.get('userId').length === 0) {
      return res.status(400).send({ code: 0, message: 'UserId value should not be empty', data: {} });
    }
    const batches = await batchesService.fetchAllBatches(req, res);
    return res.json(batches);
  }

  async fetchBatchByProduct(req: Request, res: Response) {

    const batches = await batchesService.fetchBatchDetailsByProductId(req, res);
    return res.json(batches);
  }
}