//Post Blog 文章 
const express = require('express')
const router = express.Router()

const Post = require('../../models/postModel')
const checkTokenMiddleware = require('../../middleware/checkTokenMiddleware')

//CRUD Blog Post

//搜尋全部文章 文章列表
router.get('/getAll', async (req,res)=>{
  
})

//創建/新增文章
router.post('/create',checkTokenMiddleware, async (req,res)=>{
    // console.log('checkTokenMiddleware :>> ', req.user);
    // console.log('checkTokenMiddleware :>> ', req.user.id);
    const { title, content } = req.body;
    const userId = req.user.id;
    //表單驗證

    //插入DB
    try {
        const post = await Post.create({ title, content, user: userId });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//刪除文章
router.delete('/delete/:id')

//搜尋單個文章
router.get('/post/:id', async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        .populate('user', 'username')
        console.log('post:>> ', post)
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }

        res.json(post);
        
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})

//編輯更新單一文章
router.patch('/post/:id',checkTokenMiddleware, async (req,res)=>{
  try {
    const { title, content,userId } = req.body;
    // const userId = req.user.id;

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, user: userId },
      { new: true }
    ).populate('user', 'username'); // Populate the 'user' field with the 'name' property

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = router;