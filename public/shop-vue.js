(function() {
  var shopVue = new Vue({
    el: '#shopVue',
    data: {
      productName: null,
      productDescription: null,
      productQuantity:null,
      productPrice:null,
      updateproductName: null,
      updateproductDescription: null,
      updateproductQuantity:null,
      updateproductPrice:null,
      products: [],
      carts: []

    },
    created: function() {
      var self = this;
      axios.get('http://localhost:3400/api/products')
        .then(function(res) {
          self.products = res.data;
        })
        .catch(function(err) {
          self.products = [];
        });
    },
    methods: {
      addproduct: function() {
        var self = this;
        var payload = {
          productName: self.productName,
          productDescription: self.productDescription,
          productQuantity: self.productQuantity,
          productPrice: self.productPrice
        };
        axios.post('/api/products', payload)
          .then(function(res) {
            self.products = res.data;
            self.clear();
            // self.products.push({
            //   id: 99,
            //   title: self.title,
            //   description: self.description
            // });
          })
          .catch(function(err) {
          });
      },
      addcart: function(product) {
   
        var self = this;
        var payload = {
          productName: document.getElementById("cartName").value,
          productQuantity: document.getElementById("cartQuantity").value,
          productPrice: document.getElementById("cartPrice").value
        };
        axios.post('/api/carts', payload)
          .then(function(res) {
            self.carts = res.data;
           
          })
          .catch(function(err) {
          });
      },
      clear: function() {
        
        this.productName = null;
        this.productDescription = null;
        this.productQuantity = null;
        this.productPrice = null;
      },
      increaseValue() {
        var value = parseInt(document.getElementById('productQuantitymain').value, 10);
        value = isNaN(value) ? 0 : value;
        value++;
        document.getElementById('productQuantitymain').value = value;
      },
      decreaseValue() {
        var value = parseInt(document.getElementById('productQuantitymain').value, 10);
        value = isNaN(value) ? 0 : value;
        value < 1 ? value = 1 : '';
        value--;
        document.getElementById('productQuantitymain').value = value;
        
        
      },
      editproduct: function(product) {
        
    
        var self = this;
        
        
        axios.put('/api/products/' + product.productID)
        .then(function(res) {
      
        })
        .catch(function(err) {
        });
      },

      editview: function(product) {
        this.updateproductName = product.productName;
        this.updateproductDescription =  product.productDescription;
        this.updateproductQuantity =  product.productQuantity;
        this.updateproductPrice =  product.productPrice;
      },

     
      deleteproduct: function(product) {
        
        var self = this;
        axios.delete('/api/products/' + product.productID)
        
          .then(function(res) {
            
            // self.products = res.data;
            var index = -1;
            for(var i = 0; i < self.products.length; ++i) {
              if(Number(self.products[i].productID) === Number(product.productID)) {
                index = i;
                break;
              }
            }
            self.products.splice(index, 1);
          })
          .catch(function(err) {
          });
      }
    }
  });
  console.log(shopVue);
})();


