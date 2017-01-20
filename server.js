const express       = require('express');
const bodyParser    = require('body-parser');
const request       = require('request');
const mongoose      = require('mongoose');

const Episode       = require('./app/models/episode');
const episodeRoutes = require('./app/routes/episodes.js');

const router        = express.Router();
const app           = express();

const port          = process.env.PORT || 8080;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Fix deprecation warning
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/futurama-episodes');

//Clear and repopulate database
Episode.remove({}, (err) => {
  if(err){
    console.log(err);
  }else{
    // Initialize database with all episodes
    request('http://api.tvmaze.com/singlesearch/shows?q=Futurama&embed=episodes', (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let episodes = JSON.parse(body)._embedded.episodes;
        for(let i = 0; i < episodes.length; i++)
        {
          let episode = new Episode();
          episode.episode_num = i;
          episode.title = episodes[i].name;
          episode.episode = episodes[i].number;
          episode.season = episodes[i].season;
          episode.airDate = episodes[i].airDate;
          episode.imageUrl = episodes[i].image.original;
          episode.save((err) => {
            if(err)
            {
              console.error(err);
            }
          });
        }

        router.get('/', (req, res) => {
          let episode = req.query.episode;
          if(episodes)
          {
            let amount = req.query.amount || 10;
            res.json({ message: 'hooray! welcome to our api!' +  amount });
          }else{
            res.json({ message: 'hooray! welcome to our api!'});
          }


        });

        app.use('/api/episodes', episodeRoutes);
        app.use('/api', router);

        app.listen(port);
        console.log('App is running on ' + port);
      }
    });
  }
});
