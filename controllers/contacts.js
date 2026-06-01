const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

// GET ALL CONTACTS
const getAll = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const result = await db.collection('contacts').find();
    const contacts = await result.toArray();

    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE CONTACT
const getSingle = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection('contacts').findOne({ _id: id });

    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE CONTACT
const createContact = async (req, res) => {
  try {
    const db = mongodb.getDb();

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await db.collection('contacts').insertOne(contact);

    res.status(201).json({
      message: 'Contact created',
      id: response.insertedId
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE CONTACT
const updateContact = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const id = new ObjectId(req.params.id);

    const contact = {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
      }
    };

    const response = await db.collection('contacts').updateOne(
      { _id: id },
      contact
    );

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE CONTACT
const deleteContact = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const id = new ObjectId(req.params.id);

    const response = await db.collection('contacts').deleteOne({ _id: id });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};