const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({ message: '토큰이 없습니다. 접근 거부' });
    }

    const token = authHeader.split(' ')[1]; // "Bearer <token>"

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: '유효하지 않은 토큰' });
        }
        req.user = decoded; // 토큰 내용 저장
        next();
    });
};

module.exports = verifyToken;