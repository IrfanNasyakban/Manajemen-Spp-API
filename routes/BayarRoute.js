import express from "express";
import {
    getBayar,
    getBayarById,
    saveBayar,
    updateBayar,
    deleteBayar
} from "../controller/BayarController.js";

const router = express.Router();

router.get('/bayar', getBayar);
router.get('/bayar/:id', getBayarById);
router.post('/bayar', saveBayar);
router.patch('/bayar/:id', updateBayar);
router.delete('/bayar/:id', deleteBayar);

export default router;