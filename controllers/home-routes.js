const router = require('express').Router();
const sequelize = require('../config/connection');
const { Trade, User, Item } = require('../models');
const { findAll } = require('../models/User');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Pass serialized data and session flag into template
        res.render('homepage', { 
        // TRADES HERE? 
        logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/trade', async (req,res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
  }
    
    const itemData = await Item.findAll();

    const items = itemData.map((item) => item.get({plain:true}));

    res.render('create-trade', {
      items,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})

router.get('/exchange', withAuth, async (req, res) => {
    try {
      const tradeData = await Trade.findByPk(req.query.id, {
        include: [
          { model: Item, as: 'offeredItem', where: {offeredItemId: sequelize.col('Trade.id')}},
          { model: Item, as: 'requestedItem', where: {requestedItemId: sequelize.col('Trade.id')}},
          { model: User, as: 'offerUser', where: {offeredByUserId: sequelize.col('Trade.id')}},
          { model: User, as: 'requestUser', where: {requestedByUserId: sequelize.col('Trade.id')}}
        ]
      });
      
      const trade = tradeData.get({ plain: true });

      res.render('exchange', {
        ...trade,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [
          { model: Trade, as: 'offers', include: [
              { model: Item, as: 'offeredItem'},
              { model: Item, as: 'requestedItem'},
              { model: User, as: 'offerUser'},
              { model: User, as: 'requestUser'},
            ] 
          },
          { model: Trade, as: 'requests', include: [
              { model: Item, as: 'offeredItem'},
              { model: Item, as: 'requestedItem'},
              { model: User, as: 'offerUser'},
              { model: User, as: 'requestUser'},
            ] 
          },
        ],
      });
 
      console.log('User Data:', userData);
      const user = userData.get({ plain: true });


  console.log('User Object:', user);
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json(err);
    }
});


router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
  
    res.render('login');
});

router.get('/offers', async (req, res) => {
  try {
    const tradeData = await Trade.findAll({
      include: [
          { model: Item, as: 'offeredItem', where: {offeredItemId: sequelize.col('Trade.id')}},
          { model: Item, as: 'requestedItem', where: {requestedItemId: sequelize.col('Trade.id')}},
          { model: User, as: 'offerUser', where: {offeredByUserId: sequelize.col('Trade.id')}},
          { model: User, as: 'requestUser', where: {requestedByUserId: sequelize.col('Trade.id')}}
      ]
    });
  
    const trades = tradeData.map((trade) => trade.get({plain:true}));
    for (i = 0; i < trades.length; i++) {
      trades[i].isAvailable = trades[i].status == 'pending';
    }

    res.render('offers', {
      trades,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    console.error('Error:', err);
      res.status(500).json(err);
  }
});

module.exports = router;