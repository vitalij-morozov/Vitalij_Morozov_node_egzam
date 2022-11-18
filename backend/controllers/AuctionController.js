const { auctionItemValidation } = require('../middleware/validation');
const auctionSchema = require('../schemas/AuctionSchema');

const getAllItems = async (req, res) => {
  const items = await auctionSchema.find();
  if (!items) {
    return res.json({ error: true, message: 'No items found' });
  }
  console.log('req ===', req);
  console.log('items ===', items);
  return items;
};

const addNewItem = async (req, res, item) => {
  const i = new auctionSchema(item);
  console.log('item2 ===', item);
  i.save();
  if (!i) {
    return { error: true, message: 'Failed to add new item' };
  }
  return i;
};

const getItemById = async (req, res, id) => {
  const item = await auctionSchema.findOne({ index: id });
  if (!item) {
    return res.json({ error: true, message: 'Item not found' });
  }
  return item;
};

module.exports = {
  getAllItems,
  addNewItem,
  getItemById,
};
