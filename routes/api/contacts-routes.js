const express = require("express");

const ctrl = require("../../controllers/contacts-controllers");

const { validateBody } = require("../../utils");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:id", ctrl.removeContact);

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateContact);

module.exports = router;
