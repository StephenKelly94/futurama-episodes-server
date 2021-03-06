const express       = require('express');
const bodyParser    = require('body-parser');
const request       = require('request');
const mongoose      = require('mongoose');

const Episode       = require('./app/models/episode');
const routes        = require('./app/routes/main.js');

const router        = express.Router();
const app           = express();

const port          = process.env.PORT || 8080;
const DB_URL        = process.env.MONGODB_URI || 'mongodb://localhost:27017/futurama-episodes'
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Cross origin resource sharing
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Fix deprecation warning
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL);

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
          episode.summary = episodes[i].summary.replace("<p>", "").replace("</p>", "")
          episode.episode = episodes[i].number;
          episode.season = episodes[i].season;
          episode.airdate = new Date(episodes[i].airdate);
          episode.episode_url = episodes[i].url;
          episode.image_url = episodes[i].image.original;
          episode.save((err) => {
            if(err)
            {
              console.error(err);
            }
          });
        }

        app.use('/api', routes);

        app.listen(port);
        console.log('App is running on ' + port);
      }
    });
  }
});
