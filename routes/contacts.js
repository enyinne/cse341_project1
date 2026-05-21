const express = require('express');
const router = express.Router();

const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');


// GET ALL
router.get('/', async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .collection('contacts')
      .find();

    const contacts = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET ONE
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await mongodb
      .getDb()
      .collection('contacts')
      .findOne({ _id: new ObjectId(userId) });

    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;