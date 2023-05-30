const mongoose = require('mongoose');

const bcrypt = require('bcrypt');


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
        minlength: 6, //最小6
        maxlength: 10 //最大10
      },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 16
      },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

//用 bcrypt 對 password 加密
userSchema.pre('save', async function(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});


//驗證用戶密碼
userSchema.methods.comparePassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};


module.exports = mongoose.model('user', userSchema);