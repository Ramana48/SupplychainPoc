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
    const batches = await batchesService.changeStatus(req, res);
    return res.json(batches);
  }
}