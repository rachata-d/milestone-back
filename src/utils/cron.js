const cron = require('node-cron');
const { Lot } = require('../models');
const { Op } = require('sequelize');

module.exports = cron.schedule('0 17 * * *', async () => {
  const lot = await Lot.findOne({
    where: { auctionEnd: { [Op.lte]: new Date() } },
    status: 'Ongoing',
  });
  if (lot) {
    lot.status = 'Bidding Closed';
    await lot.save();
  }
});
