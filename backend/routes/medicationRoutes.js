const express = require('express');
const router = express.Router();
const { getMedications, addMedication, markMedicationTaken } = require('../controllers/medicationController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, getMedications);
router.post('/', verifyToken, addMedication);
router.patch('/taken', verifyToken, markMedicationTaken);

module.exports = router;
