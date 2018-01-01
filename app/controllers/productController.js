const Product = require('../models/product');
// Import
const ShortUniqueId = require('short-unique-id');

// Instantiate
const uid = new ShortUniqueId();

exports.createProduct = (req, res) => {
  const product = new Product({
    name: req.body.name,
    sku: uid.randomUUID(5),
    description: req.body.description,
    price: req.body.price,
    images: []
  });

  Product.create(product,  (err, instance) => {
    if (err) {
      res.json({success: false, instance: null, error: err});
      return;
    };
    // saved!
    res.json({success: true, instance: instance});
  });
};

exports.getAllProducts = (req, res) => {

  Product.find({}, (err, products) => {
    if (err) {
      res.json({success: false, products: null, error: err});
      return;
    };
    //get all products
    res.json({success: true, products: products});
  });
};

exports.editProduct = (req, res) => {
  
  Product.findById(req.params.id, (err, product) => {
    if (err) {
      res.json({success: false, product: null, error: err});
      return;
    };

    if(product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.images = req.body.images || product.images;
      
      // Save the updated document back to the database
      product.save((err, product) => {
        if (err) {
          res.json({success: false, error: err});
        }
        res.json({success: true, product: product});
      });
    } else {
      res.json({success: false, error: 'no product found to edit'});
    }
  });
};

exports.removeProduct = (req, res) => {

  Product.findByIdAndRemove(req.params.id, (err, product) => { 
    if (err) {
      res.json({success: false});
    } else {
      res.json({success: true});
    }
  });

};