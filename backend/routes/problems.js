import express from 'express';
import problemController from '../controllers/problems.js';

const router = express.Router();

/**
 * Routes: API Endpoints
 */
router.get('/unit/:unit', problemController.getAllProblemsByUnit);
router.get('/problem-id/:id', problemController.getProblemById);
router.get('/problem-number/:number', problemController.getProblemByNumber);
router.post('/add-problem', problemController.createNewProblem);

export default router;