/**
 * indexRouter
 */
const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');

// Initializes the data-2.json file with products as its initial value if empty
const store = new SimpleJsonStore('./data.json', { products: [] });

router.get('/', function getIndexPage(req, res) {
  let viewModel = req.viewModel;
  viewModel.products = store.get('products');
  res.render('admin.pug', viewModel);
});


router.post('/', function submitproducts(req, res) {
  // Process: Get products from json -> Add new product -> Save the products
  let products = store.get('products');
  products.push({
    productName: req.body.productName,
      productDescription: req.body.productDescription,
      productQuantity: req.body.productQuantity,
      productPrice: req.body.productPrice
  });
  store.set('products', products);

  //- It just reload the page on /
  // More on redirection: https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections
  res.redirect('/');
});


module.exports = router;
