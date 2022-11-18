module.exports = (io) => {
  io.on('connect', (socket) => {
    socket.on('auctions', (data) => {
      console.log('initial data', data);
    });
  });
};
