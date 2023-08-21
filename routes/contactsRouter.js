const express = require("express");

const contactsCtrl = require("../controllers/contactsController");

const { authenticate, isValidId } = require("../middlewares");

const validateBody = require("../decorators");

const contactSchema = require("../schemas/contactSchemas");

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsCtrl.getContacts);

contactsRouter.post("/", validateBody(contactSchema), contactsCtrl.addContact);

contactsRouter.delete("/:contactId", isValidId, contactsCtrl.deleteContact);

contactsRouter.put(
  "/:contactId",
  isValidId,
  validateBody(contactSchema),
  contactsCtrl.updateById
);

module.exports = contactsRouter;
