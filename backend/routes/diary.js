const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const verifyToken = require('../middleware/auth');
router.use(verifyToken);

router.post('/Create', async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content)
        return res.status(400).json({ message: '제목과 내용을 입력하세요.' });
    try {
        const note = new Note({ title, content, userId: req.user.id });
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ message: '서버 오류입니다.' });
    }
});

router.get('/Read', async (req, res) => {
    const findNotes = await Note.find({ userId: req.user.id });
    try {
        res.status(200).json(findNotes);
    } catch (err) {
        res.status(500).json({ message: '서버 오류입니다.' }, err);
    }
});

router.get('/Read/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findById(id);
        if (!note) return res.status(404).json({ message: '노트를 찾을 수 없습니다.' });
        if (note.userId.toString() !== req.user.id) return res.status(403).json({ message: '권한이 없습니다.' });
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ message: '서버 오류입니다.' });
    }
});

router.put('/Update/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const note = await Note.findById(id);
        if (!note) return res.status(404).json({ message: '노트를 찾을 수 없습니다.' });
        if (note.userId.toString() !== req.user.id) return res.status(403).json({ message: '권한이 없습니다.' });
        note.title = title;
        note.content = content;
        await note.save();
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ message: '서버 오류입니다.' });
    }
});

router.delete('/Delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findById(id);
        if (!note) return res.status(404).json({ message: '노트를 찾을 수 없습니다.' });
        if (note.userId.toString() !== req.user.id) return res.status(403).json({ message: '권한이 없습니다.' });
        await note.deleteOne({ _id: id });
        res.status(200).json({ message: '노트가 삭제되었습니다.' });
    } catch (err) {
        res.status(500).json({ message: '서버 오류입니다.' });
        console.log(err);
    }
});

module.exports = router;