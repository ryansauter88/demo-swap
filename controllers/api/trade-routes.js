const router = require('express').Router();
const { Trade } = require('../../models');
const withAuth = require('../../utils/auth');

// when auth function is made, put it here before the async call as a param
router.post('/', withAuth, async (req, res) => {
    try {
        const newTrade = await Trade.create({
        ...req.body,
        user_id: req.session.user_id,
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