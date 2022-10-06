const router = require('express').Router();
const axios = require('axios').default;
const { User, Game } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.redirect('/', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('login');
});

router.get('/homepage', async (req, res) => {
  console.log("posting");
  function getRand(max) {
    return Math.floor(Math.random() * max);
  }
  axios({
    url: "https://api.igdb.com/v4/games",
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': process.env.CLIENT_ID,
      'Authorization': process.env.TOKEN,
    },
    data: `where id = (${getRand(212275)}, ${getRand(212275)}, ${getRand(212275)}, ${getRand(212275)}, ${getRand(212275)}, ${getRand(212275)}, ${getRand(212275)}, ${getRand(212275)}, ${getRand(212275)}, ${getRand(212275)}); fields cover.image_id,genres,involved_companies,keywords,name,parent_game,platforms.name,first_release_date,screenshots,summary,tags,url,websites;`
  })
    .then(response => {
      console.log(response.data);
      gameData = response.data;
      res.render('homepage', {
        gameData,
        loggedIn: req.session.loggedIn
      });
    })
        .catch(err => {
          console.error(err);
        });
  })
  router.get('/game/:id', withAuth, async (req, res) => {
    try {

      const games = gameData.get({ plain: true });
      res.render('browse', { games, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/review', (req, res) => {

  })
  module.exports = router;