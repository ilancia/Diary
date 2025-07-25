const express =require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const privateRoutes = require('./routes/private');
const diaryRoutes = require('./routes/diary');
const verifyToken = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/private',verifyToken,privateRoutes);
app.use('/api/diary',verifyToken,diaryRoutes);

module.exports = app;