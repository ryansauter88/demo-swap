const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Trade } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', async (req, res) => {
  try {
      const newUser = await User.findByPk(req.params.id, {
        include: [
          { model: Trade, as: 'offers', where: {id: sequelize.col('User.id')}},
          { model: Trade, as: 'requests', where: {id: sequelize.col('User.id')}}
        ]
      });

      const noOfferUser = await User.findByPk(req.params.id, {
        include: [
          { model: Trade, as: 'requests', where: {id: sequelize.col('User.id')}}
        ]
      });

      const noRequestUser = await User.findByPk(req.params.id, {
        include: [
          { model: Trade, as: 'offers', where: {id: sequelize.col('User.id')}}
        ]
      });
      
      const noTradeUser = await User.findByPk(req.params.id);

      if (newUser != null) {
        return res.status(200).json(newUser);
      }
      if (noRequestUser != null) {
        return res.status(200).json(noRequestUser);
      }
      if (noOfferUser != null) {
        return res.status(200).json(noOfferUser);
      }
      if (noTradeUser != null) {
        return res.status(200).json(noTradeUser);
      }
  } catch (err) {
    console.log(err);
      res.status(400).json(err);
  }
})

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.create(req.body);

    console.log(userData);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      console.log(userData);
      res.status(200).json(userData);
    });
  } catch (err) {
    console.error(err)
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
      .status(400)
      .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
    res
      .status(400)
      .json({ message: 'Incorrect email or password, please try again' });
    return;
    }

  req.session.save(() => {
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    
    res.json({ user: userData, message: 'You are now logged in!' });
  });

  } catch (err) {
      res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Added route for changing user password.
router.post('/change-password', withAuth, async (req, res) => {
  try {
      const { newPassword } = req.body;
      const userId = req.session.user_id;


      // Hashes the new password.
      const hashedPassword = await bcrypt.hash(newPassword, 10);


      // Update the user's password in the database.
      await User.update({ password: hashedPassword }, {
          where: {
              id: userId
          }
      });


      res.json({ message: 'Password successfully updated.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating password.' });
  }
});


module.exports = router;