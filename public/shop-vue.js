(function() {
  var shopVue = new Vue({
    el: '#shopVue',
    data: {
      productName: null,
      productDescription: null,
      productQuantity:null,
      productPrice:null,
      products: []
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
      clear: function() {
        axios.put('/api/products/' + product.productID)
        this.productName = null;
        this.productDescription = null;
        this.productQuantity = null;
        this.productPrice = null;
      },
      editproduct: function(product) {
        this.productName = product.productName;
        this.productDescription =  product.productDescription;
        this.productQuantity =  product.productQuantity;
        this.productPrice =  product.productPrice;

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

