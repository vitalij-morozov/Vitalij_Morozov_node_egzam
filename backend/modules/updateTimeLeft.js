const auctionSchema = require('../schemas/AuctionSchema');

const check = (items) => {
  items.forEach(async (item) => {
    if (item.timeLeft <= 0) {
      await auctionSchema.findOneAndUpdate({ _id: item.id }, { $set: { finished: true, timeLeft: 0 } });
    }
  });
};

const update = async () => {
  const items = await auctionSchema.find();
  check(items);
  await auctionSchema.updateMany({ finished: false }, { $inc: { timeLeft: -1 } });
  return items;
};

module.exports = update;
