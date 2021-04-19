const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const moment = require('moment');
const now = moment();

const TalkSchema = new mongoose.Schema({
    title: { type: String, default: ''},
    talk: { type: String, default: ''},
    image: { type: String, default: ''},
    user_id: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    timestamp: { type: String, default: now.format('dddd, MMMM Do YYYY, h:mm:ss a')}
});

module.exports = mongoose.model('Talk', TalkSchema);