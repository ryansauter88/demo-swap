const router = require('express').Router();
const { Trade, User, Item } = require('../models')
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
    const itemData = await Item.findAll();
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });
    const items = itemData.map((item) => item.get({plain:true}));

    res.render('create-trade', {
      ...user,
      items,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})

router.get('/trade/:id', async (req, res) => {
    try {
      const tradeData = await Trade.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
      
      const trade = tradeData.get({ plain: true });
  
      res.render('trade', {
        ...trade,
        logged_in: req.session.logged_in
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
          { model: Trade, as: 'offers' },
          { model: Trade, as: 'requests' }
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

router.get('/offers', (req, res) => {

  res.render('offers');
});

module.exports = router;