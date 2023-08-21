const Contact = require("../db/models/contactModel");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner });
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    res.status(404);
    return;
  }
  res.json({ message: "Contact deleted" });
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    res.status(404);
    return;
  }
  res.json(result);
};

module.exports = { getContacts, deleteContact, addContact, updateById };
