const { Router } = require('express');

const productController = require('./controllers/productController');

const authController = require('./controllers/authController');

const router = Router();

router.use('/', productController);	
router.use('/products', productController);	
router.use('/auth', authController);
router.get('*', (req, res) => {
    res.status('404').send('404 - Page could not be found');
});

module.exports = router;