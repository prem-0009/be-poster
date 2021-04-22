const Favorites = require("../favorites/favModel");
const User = require("../users/model/User");
// import {findOneUser} from '../users/controller/authHelper'
const { findUserWithUserName } = require("../users/controller/authHelper");

module.exports = {
  addToFavorites: async (req, res) => {
    console.clear();
    // console.log('data',req.body);
    let user = req.body.user.username;
    // let user = req.body.user.username;
    // console.log(user);
    let add = req.body.movie;
    try {
      let favMovies = {
        _id: add.id,
        // original_title:add.original_title,
        overview: add.overview,
        poster_path: add.poster_path,
        release_date: add.release_date,
        title: add.title,
      };
      //   console.log(favMovie);
      console.log("here");

      let foundUser = await findUserWithUserName(user);
      if (foundUser) {
        foundUser.favMovies.push(favMovies);
        foundUser.save();
        console.log("here is adding movies");

        res.status(200).json({ favMovies }); //change the response to success
      }
      if (!foundUser) {
        //if user doesn't exit in list create new user and his list
        let newUser = await new Favorites({
          username: user,
          _id: req.body.user.id,
          favMovies: [{ ...favMovies }],
        });

        let saveUser = await newUser.save(); //change the response to success

        res.status(200).json(saveUser);
      }

      // let saveNewMovie =
    } catch (e) {
      console.log(e);
    }
  },

  getFavoritesByID: async (req, res) => {
    // console.log(req.params);
    console.log("-------get fav");

    let getMyFavorites = await Favorites.findById({ _id: req.params.id });

    console.log(getMyFavorites);

    if (getMyFavorites.favMovies.length === 0) {
      console.log("----------deleting favorite list----------------");

      await Favorites.findByIdAndRemove({ _id: req.params.id });
    }

    res.send(getMyFavorites);
  },

  deleteFavByID: async (req, res) => {
    console.clear();

    //two param is being passed from FE 1.userId 2.movieId

    console.log("-----------------deleting------------------------");
    //first find user
    //2 find movie from list
    try {
      let findUser = await Favorites.findById({ _id: req.params.uId });
      console.log(findUser);
      console.log(req.params);

      //   let findMovieToDelete = await findUser.favMovie.remove(req.params.mId);
      let resultList = findUser.favMovies.pull({ _id: req.params.MId });

      res.status(200).json(resultList);

      findUser.save();

      //if there is no fav movies delete the user
      if (findUser.favMovies.length === 0) {
        console.log("user being deleted------------------------");

        await Favorites.findByIdAndRemove({ _id: req.params.uId });
      }
      //   res.json(200).json(findUser);
      //   console.log(findUser.favMovies);
      console.log("-----------------------------------------------");

      console.log("result", resultList);
    } catch (e) {
      console.log(e);
    }
    // Dive.update({ _id: diveId },
    //     { "$pull": { "divers": { "user": userIdToRemove } }},
    //     { safe: true, multi:true }, function(err, obj) {})
    // let _id = req.params.id;
    // console.log(_id);

    // try {
    //   let deletedByID = await Favorites.findByIdAndRemove(_id);

    //   res.status(200).json(deletedByID);
    // } catch (error) {
    //   console.log(error);
    //   res.status(500).json(error);
    // }
  },

  getAllFavorites: async (req, res) => {
    console.log(req.body);

    try {
      let allFavorites = await Favorites.find({});
      console.log("get all the favorites");
      console.log(allFavorites);
      res.status(200).json(allFavorites);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },
  //   getAllTalks: async (req, res) => {

  //     try {
  //       let allTalks = await Talk.find({})
  //       console.log('!@-------find-------@!')
  //       console.log(allTalks)

  //       res.status(200).json(allTalks);

  //     } catch (error) {
  //       console.log(error);
  //       res.status(500).json(error);
  //     }

  //   },

  //   createTalk: async (req, res) => {

  //     let id = req.body.id;
  //     let talk = req.body.talk;
  //     let title = req.body.title;
  //     let image = req.body.image;

  //     try {
  //       let foundUser = await User.findById(id);
  //       let newTalk = await new Talk({
  //         title: title,
  //         talk: talk,
  //         image: image,
  //         user_id: id
  //       });
  //       let savedNewTalk = await newTalk.save();
  //       await foundUser.talks.push(savedNewTalk);
  //       await foundUser.save();
  //       res.status(200).json(savedNewTalk);
  //     } catch (error) {
  //       res.status(500).json(error);
  //     }
  //   },
  //   getTalkByID: async (req, res) => {
  //     const id = req.params.id;
  //     try {
  //       let foundTalk = await Talk.findById({_id: id});
  //       res.status(200).json(foundTalk);
  //     } catch (error) {
  //       console.log(error)
  //       res.status(500).json(error);
  //     }

  //   },
  //   deleteByID: async (req, res) => {
  //     const id = req.params.id;

  //     try {
  //       let deletedByID = await Talk.findByIdAndRemove(id);

  //       res.status(200).json(deletedByID)

  //     } catch (error) {
  //       console.log(error)
  //       res.status(500).json(error);
  //     }

  //   },
  //   getAllUserTalks: async (req, res) => {

  //     const id = req.params.id;

  //     try {
  //       let allUserTalks = await User.findById({_id: id}).populate('talks').exec();

  //       res.status(200).json(allUserTalks.talks)

  //     } catch (error) {
  //       console.log(error)
  //       res.status(500).json(error);
  //     }

  //   }
};
