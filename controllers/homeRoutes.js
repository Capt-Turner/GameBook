const router = require('express').Router();
const axios = require('axios').default;
const { User, Game } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
      });
  
      const users = userData.map((project) => project.get({ plain: true }));
  
      res.render('homepage', {
        users,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});
  
router.get('/', async (req,res) => {
  axios({
    url: "https://api.igdb.com/v4/games",
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'zdya2d3e1t6iad3gj9jkwjjg5fckfq',
      'Authorization': 'Bearer c1v7yfzd95q34m3ced4sqgc4uj7epb',
    },
    data: "fields cover,name,screenshots,websites;"
  })
    .then(response => {
      res.render('homepage', {
        project:response.data,
        logged_in: req.session.logged_in
      });
    })
    .catch(err => {
      console.error(err);
    });
})

module.exports = router;