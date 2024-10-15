import express from 'express';
import { getPatch } from '../controllers/patches.js';
const router = express.Router();

router.post('/', getPatch);

export default router;