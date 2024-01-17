const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Trade, Item, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
    try {
        const newTrade = await Trade.findByPk(req.params.id, {
            include: [
                { model: Item, as: 'offeredItem', where: {offeredItemId: sequelize.col('Trade.id')}},
                { model: Item, as: 'requestedItem', where: {requestedItemId: sequelize.col('Trade.id')}},
                { model: User, as: 'offerUser', where: {offeredByUserId: sequelize.col('Trade.id')}},
                { model: User, as: 'requestUser', where: {requestedByUserId: sequelize.col('Trade.id')}}
            ]
        });
        res.status(200).json(newTrade);
    } catch (err) {
        res.status(400).json(err);
    }
})

// when auth function is made, put it here before the async call as a param
router.post('/', withAuth, async (req, res) => {
    try {
        const newTrade = await Trade.create({
        ...req.body,
        offeredByUserId: req.session.user_id,
        });

        res.status(200).json(newTrade);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedTrade = await Trade.update(
            {
              // All the fields you can update and the data attached to the request body.
              status: req.body.status,
              offeredItemId: req.body.offeredItemId,
              offeredItemAmt: req.body.offeredItemAmt,
              requestedItemId: req.body.requestedItemId,
              requestedItemAmt: req.body.requestedItemAmt,
            },
            {
              // Gets the trade based on the id given in the request parameters
              where: {
                id: req.params.id,
              },
            }
        );
        res.status(200).json(updatedTrade);
    }
    catch (err) {
        res.status(400).json(err); 
    }
});
module.exports = router;