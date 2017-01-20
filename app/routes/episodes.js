const express = require('express');
const Episode = require('../models/episode');

const router  = express.Router();

router.route('/')
  .get((req, res) => {
    //Make empty query
    let episode = req.query.episode;
    let query = {};
    //If there are params add to the query
    if(episode)
    {
      let size = req.query.size || 10;
      query.episode_num = { $gte: episode, $lt: Number(episode) + Number(size) };
    }
    //Make the query
    Episode.find(query, (err, episodes) => {
      if (err){
        res.send(err);
      }else{
        res.json(episodes);
      }
    });

  });

router.route('/:episode_id')
  .get((req, res) => {
    Episode.findById(req.params.episode_id, (err, episode) => {
      if (err){
        res.send(err);
      }else{
        res.json(episode);
      }
    });
  });

module.exports = router;
