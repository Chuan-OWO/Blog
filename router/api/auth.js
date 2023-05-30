const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const User = require('../../models/usersModel')


//註冊 修改 驗證 登入 登出

//用戶註冊
router.post('/register', async (req, res) => {
    const { email,username,password } = req.body;

    try {
        //檢查輸入是否為空
        
        if(!email || !username || !password){
            return res.status(400).json(
            { error: `email:${email}不能為空、username:${username}不能為空、password:${password}不能為空 ` });
        }

        function validateEmail(email) {
            // 使用正規表達是驗證格式
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        if (validateEmail(email)) {
            console.log(`email:${email}格式正確`);
        } else {
            return res.status(400).json({ error: 'email 格式錯誤' });
            // console.log("email格式錯誤");
        }

        // 檢查用戶是否存在
        const existingUser = await User.findOne({ email });
            if (existingUser) {

            return res.status(400).json({ error: 'email 已經存在' });
        }
        
        //創建新的User
        // const User = new User({ email,username,password });
        // const User = 
        await User.create({ email,username,password });
        
        console.log("@@@@",User)
        
        res.status(200).json({ message: '註冊成功' });
        
    } catch (error) {
      res.status(500).json({ error: '註冊失敗' });

    }
  });




module.exports = router