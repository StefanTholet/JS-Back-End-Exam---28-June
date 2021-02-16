const { Router } = require('express');

const isAuthenticated = require('../middlewares/isAuthenticated');

const productService = require('../services/productService');

const errorCompiler = require('./helpers/errorCompiler');

const router = Router();

const User = require('../models/User');

const Product = require('../models/Product');

router.get('/', (req, res) => {
    productService.getAll()
        .then(products => {
            if (res.locals.isAuthenticated) {
                const arrangedProducts = products.filter(x => x.isPublic == true)
                    .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
                    .map(x => {
                        x.likes = x.likedBy.length;
                        return x;
                    });
                res.render('./users/home', { title: 'Browse', arrangedProducts });
            } else {
                const arrangedProducts = products.filter(x => x.isPublic == true)
                    .sort((a, b) => {
                        return b.likedBy.length - a.likedBy.length;
                    }).slice(0, 3)
                res.render('./guests/home', { title: 'Browse', arrangedProducts });
            }
        })
        .catch((error) => {
            const errors = errorCompiler(error);
            if (res.locals.isAuthenticated) {
                res.render('./users/home', errors)
            } else {
                res.render('./guests/home', errors);
            }

        })
});

router.get('/products/create', isAuthenticated, (req, res) => {
    res.render('./users/create', { title: 'Create' });
});

router.post('/products/create', isAuthenticated, (req, res) => {
    const productData = req.body;
    const user = req.user;
    productData.createdOn = new Date();
    productData.isPublic ? productData.isPublic = true : undefined;
    productService.create(productData, user._id)
        .then((createdProduct) => {
            res.redirect('/');
        })
        .catch((error) => {
            const errors = errorCompiler(error);
            res.render('./users/create', { errors })
        })
});

router.get('/products/:productId/details', isAuthenticated, (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            if (req.user._id == String(product.creator._id)) {
                product.isCreator = true;
            } else if (product.likedBy.includes(req.user._id)) {
                product.liked = true;
            }
            res.render('./users/details', { title: 'Product Details', product })
        })
        .catch(err => { throw err });
});


router.get('/products/:productId/edit', isAuthenticated, (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            res.render('./users/edit', { title: 'Edit Product', product });
        })
        .catch(err => { throw err });
});

router.post('/products/:productId/edit', isAuthenticated, (req, res) => {
    const productData = req.body;
    const productId = req.params.productId
    productData.isPublic ? productData.isPublic = true : productData.isPublic = false;
    productService.updateOne(productId, productData)
        .then(response => {
            res.redirect(`/products/${req.params.productId}/details`);
        })
        .catch((error) => {
            const errors = errorCompiler(error);
            res.render('./users/create', { errors })
        })
});


router.get('/products/:productId/delete', isAuthenticated, (req, res) => {
    console.log('y')
    productService.getOne(req.params.productId)
        .then(product => {
            productService.deleteOne(String(product._id))
        }).then((response => res.redirect('/')))
        .catch(err => { throw err });
});


router.get('/products/:productId/like', (req, res) => {
    const productId = req.params.productId;
    const userId = req.user._id;
    productService.updateDbArray(Product, productId, 'likedBy', userId)
        .then(result => {
            res.redirect(`/products/${productId}/details`);
        })

});

module.exports = router;
