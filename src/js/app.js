require('babel-register')
require("babel-core/register");
require("babel-polyfill"); // If you use async and await
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from '../routes';
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname + '../../lib')));
app.use('/', indexRouter);
export default app;