var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const validaToken = require('./middlewares/validaToken');
var ContatosRouter = require('./routes/ContatosRouter');
var AuthRouter = require('./routes/AuthRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', AuthRouter);
app.use('/contatos', validaToken, ContatosRouter);

module.exports = app;
