const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const EpisodeSchema   = new Schema({
  episode_num: { type: Number, index: { unique: true } },
  title: String,
  episode: Number,
  season: Number,
  airDate: Date,
  imageUrl: String
});

module.exports = mongoose.model('Episode', EpisodeSchema);
