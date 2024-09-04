const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/contactController");

router.post("/", ContactController.addContact);
router.post("/generateContacts", ContactController.generateContacts);
router.get("/d", ContactController.getContacts);
router.put("/:id", ContactController.updateContact);
router.delete("/:id", ContactController.deleteContact);

module.exports = router;
