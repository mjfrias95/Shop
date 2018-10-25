/**
 * notesRouter.js
 */
const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');

const store = new SimpleJsonStore('./data.json', { products: [] });

router.get('/', (req, res, next) => {
    console.log('Index page only');
    next();
  }, (req, res) => {
    res.json(store.get('products'));
  });
  
  router.get('/:id', (req, res) => {
    let product = {};
    const products = store.get('products');
    product = products.find(products => products.productID === req.params.productID);
    res.json(product);
  });
  
  router.post('/', (req, res) => {
    const products = store.get('products');
    const newProduct = {
      productID: products.length > 0 ? products[products.length - 1].productID + 1 : 1,
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productQuantity: req.body.productQuantity,
      productPrice: req.body.productPrice
    };

    products.push(newProduct);
    store.set('products', products);
  
    res.json(products);
  });

  router.put('/:id', (req, res) => {
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
  
    store.set('products', products);
    res.json(store.get('products'));
  });
  
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const products = store.get('products');
    const newProduct = products.filter(product => Number(product.productID) !== Number(id));
  
    store.set('products', newProduct);
    res.json(newProduct);
  });
module.exports = router;