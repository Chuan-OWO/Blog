const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
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
// 在 userSchema 上建立 Pre middleware 將密碼在儲存(save)前處理
userSchema.pre('save', async function(next) {
  try {
    //this 指向目前正被儲存的使用者 document
    const user = this 

    const salt = await bcrypt.genSalt(10);

    // 確認使用者的 password 欄位是有被變更：初次建立＆修改密碼都算
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, salt);
    }

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

// 建立 userSchema 實例(Document)能使用的方法：產生 JWT
userSchema.methods.generateAuthToken = async function() {
  try {
    // this 指向當前的使用者實例
    const user = this;
    // 產生一組 JWT
    const token = await jwt.sign(
      { _id: user._id }, 
      process.env.JWTSECRET,
      {
        expiresIn: 60 * 60 * 24 //一天
      }
    )
     // 回傳 JWT
    return token;
  } catch (error) {
    // 處理錯誤
    console.error('生成令牌时出错：', error);
    throw error;
  }
};



module.exports = mongoose.model('user', userSchema);