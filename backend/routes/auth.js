const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ message: '사용자 기입정보를 입력하세요.' });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: '회원가입 성공' });
    } catch (err) {
        res.status(500).json({ message: '회원가입 실패' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!username) return res.status(400).json({ message: '로그인 아이디가 존재하지않았습니다.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: '비밀번호가 일치하지않습니다.' });

        const token = jwt.sign(
            { id: user.id, password: user.password },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ message: '로그인 성공' }, token);
    } catch (err) {
        res.status(400).json({message:'로그인 실패'});
    }
});
module.exports = router;