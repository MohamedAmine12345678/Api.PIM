const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  contact_number: { type: String, required: true },
  contact_name: { type: String, required: true },
  contact_description: { type: String },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Contact", ContactSchema);
