const express =require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

router.get('/profile',verifyToken,async (req,res) => {
    res.json({message: '인증된 사용자만 접근할 수 있는 프로필 정보', user: req.user});
})
module.exports = router;