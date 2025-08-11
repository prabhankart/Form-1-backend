const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

// Create a new form
router.post('/forms', formController.createForm);

// Get a specific form by its ID (for filling)
router.get('/forms/:id', formController.getForm);

// Submit a response to a form
router.post('/forms/:id/responses', formController.submitResponse);

module.exports = router;