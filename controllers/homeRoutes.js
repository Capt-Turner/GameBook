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
  
      res.redirect('/homepage', {
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

router.get('/homepage', async (req, res) => {
  console.log("posting");
  axios({
    url: "https://api.igdb.com/v4/games",
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Client-ID': process.env.CLIENT_ID,
        'Authorization': process.env.TOKEN,
    },
    data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;"
  })
    .then(response => {
      console.log(response.data);
      gameData = response.data;
      const storeGames = async () => {
        await sequelize.sync({force:true});
        await Game.bulkCreate(gameData, {    
        individualHooks: true,
        returning: true,
      });
      storeGames();
    };
      res.render('homepage', {
        gameData,
        loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.error(err);
    });
});

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