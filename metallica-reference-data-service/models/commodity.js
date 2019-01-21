const mongoose = require("mongoose");

var CommoditySchema = new mongoose.Schema({
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

var Commodity = mongoose.model("Commodity", CommoditySchema);
module.exports = { Commodity };