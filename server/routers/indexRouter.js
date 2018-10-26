/**
 * indexRouter
 */
const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');

// Initializes the data-2.json file with products as its initial value if empty
const store = new SimpleJsonStore('./data.json', { products: [] });


router.get('/admin', function getIndexPage(req, res) {
  let viewModel = req.viewModel;
  viewModel.products = store.get('products');
  res.render('admin.pug', viewModel);
});



router.post('/:id', (req, res) => {
  console.log("cart");

  
  const id = req.params.id;
  const products = store.get('products');

  for(let i = 0; i < products.length; i++) {
   
    if(products[i].productID === id) {
     
      products[i].productName = req.body.productName;
      products[i].productDescription = req.body.productDescription;
      products[i].productQuantity = req.body.productQuantity;
      products[i].productPrice = req.body.productPrice;
      break;
    }
  }

  console.log('try');


  const carts = store.get('carts');
  const newProduct = {
  
      productName: req.body.productName,
      productQuantity: req.body.productQuantity,
      productPrice:  req.body.productPrice
  
  };


  carts.push(newProduct);
  store.set('carts', carts);

  res.json(carts);
});


router.put('/', function submitproducts(req, res) {
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
