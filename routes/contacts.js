const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

// GET ALL
router.get('/', contactsController.getAll);

// GET ONE
router.get('/:id', contactsController.getSingle);

// CREATE
router.post('/', contactsController.createContact);

// UPDATE
router.put('/:id', contactsController.updateContact);

// DELETE
router.delete('/:id', contactsController.deleteContact);

module.exports = router;