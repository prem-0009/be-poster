const mongoose = require("mongoose");
const moment = require("moment");
const now = moment();

var FavoritesSchema = new mongoose.Schema({
  //   adult: false,
  //   backdrop_path: '/2va32apQP97gvUxaMnL5wYt4CRB.jpg',
  //   genre_ids: [ 14, 28 ],
  username: { type: String },
  favMovies: [
    {
      _id: { type: Number },
      //   original_language: { type: String },
      //   original_title: { type: String },
      overview: { type: String },
      //   popularity: 33.613,
      poster_path: { type: String },
      release_date: { type: String },
      title: { type: String },
      //   video: false,
      vote_average: { type: Number },
      vote_count: { type: Number },
    },
  ],
});

module.exports = mongoose.model("Favorites", FavoritesSchema);

// adult: false,
// backdrop_path: '/2va32apQP97gvUxaMnL5wYt4CRB.jpg',
// genre_ids: [ 14, 28 ],
// id: 268,
// original_language: 'en',
// original_title: 'Batman',
// overview: `Batman must face his most ruthless nemesis when a deformed madman calling himself "The Joker" seizes control of Gotham's criminal underworld.`,
// popularity: 33.613,
// poster_path: '/tDexQyu6FWltcd0VhEDK7uib42f.jpg',
// release_date: '1989-06-23',
// title: 'Batman',
// video: false,
// vote_average: 7.2,
// vote_count: 5438
// }
