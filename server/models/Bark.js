const mongoose = require("mongoose");
const { Schema } = mongoose;

const barkSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

const Bark = mongoose.model("Bark", barkSchema);

module.exports = Bark;
