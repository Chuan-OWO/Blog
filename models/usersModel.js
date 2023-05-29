const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true, //  必填欄位，若缺少此欄位，mongoDB 不會建立此 document 並會回傳 error
        trim: true, //  去除掉不必要的空白
        unique: true, //  確認這個 email 是唯一
      },
      username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model('User', userSchema);