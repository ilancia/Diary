const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header.authorization;
    if (!authHeader) res.status(403).json({ message: '토큰없음,forbidden' });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: '유효치않은 토큰입니다.' });
        req.user = decoded;
        next();
    })
}

module.exports = verifyToken;