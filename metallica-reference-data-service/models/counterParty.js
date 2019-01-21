const mongoose = require("mongoose");

var CounterPartySchema = new mongoose.Schema({
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

var CounterParty = mongoose.model("CounterParty", CounterPartySchema);
module.exports = { CounterParty };
