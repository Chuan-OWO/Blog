const mongoose = require('mongoose');

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: String,
    content: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // 與user 產生關聯
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  });

module.exports = mongoose.model('post', postSchema);