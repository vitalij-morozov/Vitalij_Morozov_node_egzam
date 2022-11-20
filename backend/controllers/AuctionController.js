const auctionSchema = require('../schemas/AuctionSchema');

const getAllItems = async (req, res) => {
  const items = await auctionSchema.find();
  if (!items) {
    return res.json({ error: true, message: 'No items found' });
  }
  return items;
};

module.exports = {
  getAllItems,
};
