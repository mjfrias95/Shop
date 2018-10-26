/**
 * @description
 * Entry file for The Province Man's Web App
 */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const adminRouter = require('./server/routers/adminRouter');
const productRouter = require('./server/routers/productRouter');
const indexRouter = require('./server/routers/indexRouter');
const port = 3400;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static('public'));


app.use((req, res, next) => {
  req.viewModel = {
    title: 'Welcome to Online Shopepee'
  };
  next();
});


app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');

app.use('/', adminRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', indexRouter);

app.listen(port, (err) => {
  if(err) { return console.error(err); }
  console.log(`Listening to ${port}...`);
});
