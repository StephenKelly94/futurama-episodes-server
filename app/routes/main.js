const express = require('express');
const Episode = require('../models/episode');

const router  = express.Router();

router.route('/episodes')
  .get((req, res) => {
    //Make empty query
    let episode = req.query.episode;
    let query = {};
    //If there are params add to the query
    if(episode)
    {
      let size = req.query.size || 10;
      query.episode_num = { $gte: Number(episode), $lt: Number(episode) + Number(size) };
    }
    //Make the query
    Episode.find(query).sort({episode_num: 'asc'}).exec((err, episodes) => {
      if (err){
        res.status(500).send('No episodes exist for this query');
      }else{
        res.json(episodes);
      }
    });

  });

router.route('/:episode_id')
  .get((req, res) => {
    Episode.findById(req.params.episode_id, (err, episode) => {
      if (err){
        res.status(404).send('Episode not found');
      }else{
        res.json(episode);
      }
    });
  });

router.route('/season/:season_number')
  .get((req, res) => {
    Episode.find({season: req.params.season_number}, (err, episodes) => {
      if (err){
        res.status(404).send('Season does not exist');
      }else{
        res.json(episodes);
      }
    });
  });

module.exports = router;
