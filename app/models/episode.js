const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const EpisodeSchema   = new Schema({
  episode_num: { type: Number, index: { unique: true } },
  title: String,
  summary: String,
  episode: Number,
  season: Number,
  airdate: Date,
  episode_url: String,
  image_url: String
});

module.exports = mongoose.model('Episode', EpisodeSchema);
