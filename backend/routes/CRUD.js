const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Diary = require('../models/Diary');

router.post('/Create', async (req, res) => {
    const { title, content, userId } = req.body;
    if (!title || !content || !userId) {
        return res.status(400).json({ message: '제목, 내용, 사용자 ID는 필수입니다.' });
    }
    const diary = new Diary({
        id: Date.now(),
        title,
        content,
        userId: req.user.id
    });
    await diary.save();
    res.status(201).json({ message: '일기 작성 성공', diary });
});
router.get('/Read', verifyToken, async (req, res) => {
    try {
        const diaries = await Diary.find({ userId: req.user.id });
        res.status(200).json(diaries);
    } catch (error) {
        res.status(500).json({ message: '서버 오류' });
    }
});

router.get('/Read/:id',verifyToken ,async (req, res) => {
    const diary = await Diary.findOne({ id: req.params.id, userId: req.user.id });
    if (!diary) return res.status(404).json({ message: '일기를 찾을 수 없습니다.' });
    res.status(200).json(diary);
});

router.put('/Update/:id',verifyToken, async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: '제목과 내용은 필수입니다.' });
    }
    const diary = await Diary.findOneAndUpdate(
        { id: req.params.id, userId: req.user.id },
        { title, content },
        { new: true }); //최신문서 반환하는 역할의 옵션
    if (!diary) return res.status(404).json({ message: '일기를 찾을 수 없습니다.' });
    res.status(200).json({ message: '일기 수정 성공', diary });
});

router.delete('/Delete/:id',verifyToken, async (req, res) => {
    const diary = await Diary.findOneAndDelete({ id: req.params.id, userId: req.user.id });
    if (!diary) return res.status(404).json({ message: '일기를 찾을 수 없습니다.' });
    res.status(200).json({ message: '일기 삭제 성공' });
});

module.exports = router;