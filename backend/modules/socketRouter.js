const { getAllItems } = require('../controllers/AuctionController');
const auctionSchema = require('../schemas/AuctionSchema');

module.exports = (io) => {
  io.on('connect', (socket) => {
    socket.on('addNew', async (item) => {
      let response;
      const i = new auctionSchema(item);
      await i.save();
      console.log('item ===', item);
      if (!i) {
        response = { error: true, message: 'Failed to add new item' };
      } else {
        response = { error: false, message: 'Item successfully added' };
      }
      console.log('response ===', response);
      socket.emit('addNewResponse', response);
    });
    socket.on('auctions', async (data) => {
      console.log('initial data', data);
      const allItems = await getAllItems();
      io.emit('getAllItems', allItems);
    });
    socket.on('itemById', async (itemId) => {
      let response;
      const item = await auctionSchema.findOne({ index: itemId });
      if (!item) {
        response = { error: true, message: 'Failed to find item' };
      } else {
        response = item;
      }
      socket.on('updateItem', async (newValues) => {
        await auctionSchema.findOneAndUpdate({ index: itemId }, newValues);
      });
      socket.emit('getItem', response);
    });
  });
};
