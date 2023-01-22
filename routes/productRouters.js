const express = require('express');
const productControllers = require('../controllers/productControllers');
const updateController = require('../controllers/updateProductController');


const router = express.Router();


router.route('/')
    .get(productControllers.getAllProducts)
    .post(productControllers.upload.single('image'), productControllers.createNewProduct)

router.route('/delete/:id')
    .post(productControllers.deleteProducts)

router.route('/update/:id')
    .get(updateController.makeNewUpdate)
    .post(updateController.upload.single('image'), updateController.updateProduct)


module.exports = router;