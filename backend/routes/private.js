const express =require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

router.get('/',verifyToken,(req,res)=>{
    res.status(200).json({message:'인증완료되었습니다.'});
});

module.exports = router;