const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auctionSchema = new Schema({
  index: {
    type: Number,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  finished: Boolean,
  bids: {
    type: Array,
    required: true,
  },
  timeLeft: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Type12ExamAuctionItems', auctionSchema);
