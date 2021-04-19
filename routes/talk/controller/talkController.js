const Talk = require('../model/Talk');
const User = require('../../users/model/User');

module.exports = {

  getAllTalks: async (req, res) => {

    try {
      let allTalks = await Talk.find({})
      console.log('!@-------find-------@!')
      console.log(allTalks)
      
      res.status(200).json(allTalks);                 

    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }


  },

  createTalk: async (req, res) => {

    let id = req.body.id;
    let talk = req.body.talk;
    let title = req.body.title;
    let image = req.body.image;

    try { 
      let foundUser = await User.findById(id);
      let newTalk = await new Talk({
        title: title,
        talk: talk,
        image: image, 
        user_id: id
      });
      let savedNewTalk = await newTalk.save();
      await foundUser.talks.push(savedNewTalk);
      await foundUser.save(); 
      res.status(200).json(savedNewTalk);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getTalkByID: async (req, res) => {
    const id = req.params.id; 
    try {
      let foundTalk = await Talk.findById({_id: id});
      res.status(200).json(foundTalk);
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }

  },
  deleteByID: async (req, res) => {
    const id = req.params.id;

    try {
      let deletedByID = await Talk.findByIdAndRemove(id);

      res.status(200).json(deletedByID)

    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }

  },
  getAllUserTalks: async (req, res) => {

    const id = req.params.id;

    try {
      let allUserTalks = await User.findById({_id: id}).populate('talks').exec();

      res.status(200).json(allUserTalks.talks)

    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }

  }
}