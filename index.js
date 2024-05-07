const express = require('express');
const path = require('path');
const cookueParser = require('cookie-parser');
const connectToMongoDB = require('./connection');
const { restrictToLoggedInUserOnly, checkAuth } = require('./middlewares/auth');

const urlRouter = require('./router/url');
const staticRouter = require('./router/staticRouter');
const userRouter = require('./router/user');

const app = express();
const PORT = 8001

connectToMongoDB('mongodb://localhost:27017/short-url');

app.set('view engine', 'ejs'); // telling express that the view enginer is EJS
app.set('views', path.resolve('./views')); // telling express where the views/ejs-files are located

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookueParser());
app.use('/url', restrictToLoggedInUserOnly, urlRouter);
app.use('/', checkAuth, staticRouter);
app.use('/user', userRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
