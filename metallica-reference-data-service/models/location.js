const mongoose = require("mongoose");

var LocationSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    minlength:2,
    maxlength:6,
  },
  description: {
    type: String,
    required: true,
  }
});

var Location = mongoose.model("Location", LocationSchema);
module.exports = { Location };
