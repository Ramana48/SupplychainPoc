import * as express from "express";
import BatchesController from "../controllers/batches.controller";
import AuthenticatorMiddleware from "../middlewares/auth.middleware";

const router = express.Router();
const batchesController = new BatchesController();


router.post("/", AuthenticatorMiddleware.checkIfBodyParamsExistBatchApi,
    batchesController.addBatch);
router.get("/:batchId", batchesController.fetchBatch);
router.put("/:batchId", batchesController.changeStatus);



export default router;
