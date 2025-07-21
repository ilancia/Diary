const express =require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).json({message:'인증완료되었습니다.'});
});

module.exports = router;