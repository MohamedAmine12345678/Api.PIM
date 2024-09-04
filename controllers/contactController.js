const Contact = require("../models/Contact");
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

exports.addContact = async (req, res) => {
  try {
    const { contact_number, contact_name, contact_description } = req.body;
    const newContact = new Contact({
      contact_number,
      contact_name,
      contact_description,
    });

    await newContact.save();
    console.log("Contact saved successfully");
    res.status(201).json(newContact);
  } catch (error) {
    console.log("Error adding Contact:", error);
    res
      .status(500)
      .json({ message: "Failed to add Contact", error: error.message });
  }
};

exports.generateContacts = async (req, res) => {
  try {
    const numberOfContacts = req.body.numberOfContacts || 10;
    const contacts = [];
    const prefixes = ["50", "55", "90", "99", "20", "29"];
    for (let i = 0; i < numberOfContacts; i++) {
      const prefix = faker.helpers.arrayElement(prefixes);
      const suffix = faker.phone.number("### ###");
      const contact_number = `+216 ${prefix} ${suffix}`.trim();

      const newContact = new Contact({
        contact_number: contact_number.trim(),
        contact_name: faker.person.fullName(),
        contact_description: `Contact in Tunisia - ${faker.location.city()}, ${faker.lorem.sentence()}`,
      });
      contacts.push(newContact);
    }

    await Contact.insertMany(contacts);
    console.log(`${numberOfContacts} Contacts generated successfully`);
    res.status(201).json({
      message: `${numberOfContacts} Contacts generated successfully`,
      contacts,
    });
  } catch (error) {
    console.log("Error generating Contacts:", error);
    res
      .status(500)
      .json({ message: "Failed to generate Contacts", error: error.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    if (!contacts.length) {
      return res.status(404).json({ message: "No Contacts found" });
    }
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching Contacts:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const ContactId = req.params.id;
    const { contact_number, contact_name, contact_description } = req.body;

    console.log("Received request to update Contact.");
    console.log(`Contact ID: ${ContactId}`);
    console.log(`New Text: ${text}`);

    if (!mongoose.Types.ObjectId.isValid(ContactId)) {
      console.error("Invalid ContactId format");
      return res.status(400).json({ message: "Invalid ContactId format" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      ContactId,
      { contact_number, contact_name, contact_description },
      { new: true }
    );

    if (!updatedContact) {
      console.error("Contact not found for update");
      return res.status(404).json({ message: "Contact not found" });
    }

    console.log("Contact updated successfully:", updatedContact);
    res.status(200).json(updatedContact);
  } catch (error) {
    ails;
    console.error("Error occurred while updating Contact:", error);
    res
      .status(500)
      .json({ message: "Failed to update Contact", error: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const ContactId = req.params.id;
    const contact = await Contact.findByIdAndDelete(ContactId);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting Contact:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
