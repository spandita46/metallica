const mongoose = require("mongoose");
const moment = require("moment");

var CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 100000 }
});

var Counter = mongoose.model("counter", CounterSchema);

var TradeSchema = new mongoose.Schema({
  tradeId: {
    type: Number,
    unique: true
  },
  tradeDate: {
    type: Date,
    required: true,
    trim: true
  },
  side: {
    type: String,
    required: true,
    enum: ["BUY", "SELL"]
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  counterParty: {
    type: String,
    required: true,
    trim: true
  },
  commodity: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    default: "OPEN",
    enum: ["OPEN", "CLOSE"]
  },
  currency: {
    type: String,
    trim: true,
    max: 4,
    default: "USD"
  }
});

TradeSchema.methods.toJSON = function() {
  var trade = this;
  var tradeObj = trade.toObject();
  tradeObj.tradeDate = moment(tradeObj.tradeDate).format("YYYY-MM-DD");
  return tradeObj;
};

TradeSchema.pre("save", function(next) {
  var tradeDoc = this;

  Counter.findById("tradeId").then(counter => {
    if (!counter) {
      console.log("Counter Not Found");
      new Counter({
        _id: "tradeId"
      })
        .save()
        .then(counterDoc => {
          tradeDoc.tradeId = counterDoc.seq;
        });
    } else {
      console.log("Counter  Found");
      Counter.findByIdAndUpdate(
        { _id: "tradeId" },
        { $inc: { seq: 1 } },
        {
          new: true
        },
        (error, counterDoc) => {
          if (error) {
            console.log("Counter update error");
            return next(error);
          }
          console.log(counterDoc);
          tradeDoc.tradeId = counterDoc.seq;
          next();
        }
      );
    }
  });
});

var Trade = mongoose.model("Trade", TradeSchema);

module.exports = { Trade };
