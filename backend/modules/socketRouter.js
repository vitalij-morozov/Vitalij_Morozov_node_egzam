const { getAllItems } = require('../controllers/AuctionController');
const { auctionItemValidation } = require('../middleware/validation');
const auctionSchema = require('../schemas/AuctionSchema');

const update = require('./updateTimeLeft');

module.exports = (io) => {
  io.on('connect', async (socket) => {
    const allItems = await getAllItems();
    io.emit('getAllItems', allItems);

    socket.on('addNew', async (item) => {
      let response;
      const fieldValidateion = await auctionItemValidation(item);
      if (fieldValidateion.error) {
        const msg = fieldValidateion.details.map((err) => `${err.message} `);
        response = { error: true, message: msg };
        socket.emit('addError', response);
        return;
      }
      const i = new auctionSchema(item);
      await i.save();
      console.log('item ===', item);
      if (!i) {
        response = { error: true, message: 'Failed to add new item' };
      } else {
        response = { error: false, message: 'Item successfully added' };
      }
      io.emit('newLot', item);
    });

    socket.on('auctions', async () => {
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
      socket.emit('getItem', response);
    });

    socket.on('updateBids', async (data) => {
      await auctionSchema.findOneAndUpdate({ index: data.id }, { $push: { bids: data.newBid } });
      console.log('newBid ===', data.newBid);
      io.emit('getBid', data.newBid);
    });

    socket.on('timeUpdate', async () => {
      const res = await update();
      const times = res.map((item) => item.timeLeft);
      socket.emit('updatedTime', times);
    });
  });
};
