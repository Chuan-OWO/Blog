const jwt = require('jsonwebtoken')

const User = require('../models/usersModel')

//jwt 身分驗證 
module.exports = async  (req,res,next)=>{
    try {
        // 從來自客戶端請求的 header 取得和擷取 JWT
        const token = req.header('Authorization').replace('Bearer ', '')
        if(!token){
            return res.status(200).json({error:'輸入的 token 不存在'})
        }
        // 驗證 Token
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        // const userId = decoded._id;

        //驗證邏輯
        //找尋符合用戶 id  的使用者資料
        const user = await User.findOne({ _id: decoded._id})
        if(!user){
            return res.status(200).json({error:'輸入的 用戶 不存在'})
        }

        // 將 token 存到 req.token 上供後續使用
        req.token = token
        // 將用戶完整資料存到 req.user 上供後續使用
        console.log('user :>> ', user);
        req.user = user

        next()
    } catch (error) {
        res.status(401).send('無效的 token');
    }
}