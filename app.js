const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended:false}));

const memberRouter = require('./router/MemberRouter');
const musicRouter = require('./router/MusicRouter');

app.use('/',memberRouter);
app.use('/',musicRouter);

module.exports = app;