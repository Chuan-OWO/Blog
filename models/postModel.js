const mongoose = require('mongoose');

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: String,
    content: String,
    // 與User 產生關聯
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  });

module.exports = mongoose.model('post', postSchema);