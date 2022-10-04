const router = require('express').Router();
const axios = require('axios').default;
const { User, Game } = require('../../models');

router.post('/login', async (req,res) => {
    try {
        const userData = await User.findOne({where: {email: req.body.email}});
        if (!userData) {
            res
              .status(400)
              .json({ message: 'Incorrect email or password, please try again' });
            return;
          }

        const validPassword = await userData.checkPassword(req.body.pw);
      
        console.log(userData.id);
        if (!validPassword) {
            res
            .status(401)
            .json({ message: 'Incorrect email or password, please try again' });
          return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            console.log("sup");
            
            res.json({ user: userData, message: 'Welcome to GameBook!' });
          });
      
        } catch (err) {
          res.status(402).json(err);
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