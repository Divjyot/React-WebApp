const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Cryptocurrency = new Schema({
  cryptocurrency_name: {
    type: String
  },
  cryptocurrency_units: {
    type: Number
  },
  cryptocurrency_price: {
    type: Number
  },

  newtype: {
    type: [
      {
        units: Number,
        price: Number
      }
    ]
  }
});

module.exports = mongoose.model("cryptocurrency", Cryptocurrency);
