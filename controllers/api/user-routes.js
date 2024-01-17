const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Trade } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', async (req, res) => {
  try {
      const newUser = await User.findByPk(req.params.id, {
        include: [
          // { model: Trade, as: 'offers', where: {id: sequelize.col('User.id')}},
          // { model: Trade, as: 'requests', where: {id: sequelize.col('User.id')}}
        ]
      });
      res.status(200).json(newUser);
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

module.exports = router;