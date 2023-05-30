const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const User = require('../../models/usersModel')

//註冊 修改 驗證 登入 登出

//用戶註冊
router.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = new User({ username, password });
      await user.save();
      res.status(200).json({ message: '註冊成功' });
    } catch (error) {
      res.status(500).json({ error: '註冊失敗' });
    }
  });