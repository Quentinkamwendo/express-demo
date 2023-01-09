const express = require('express');
const productControllers = require('../controllers/productControllers')


const router = express.Router();


router.route('/')
    .get(productControllers.getAllProducts)
    .post(productControllers.createNewProduct)

router.route('/delete/:id')
    .post(productControllers.deleteProducts)

router.route('/update/:id')
    .get(productControllers.makeNewUpdate)
    .post(productControllers.updateProduct)


module.exports = router;