const connection = require('../model/db');
const multer = require('multer');
const path = require("path");

const makeNewUpdate = (req, res) => {
    const id = req.params.id;
    connection.query(`SELECT * FROM products WHERE id = ?`, [id], (error, results) => {
        if (error) {
            console.error(error);
            res.send(500);
            return;
        }
        res.render('updateForm', { products: results[0], isLoggedIn: true });
    });
}
const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const updateProduct = (req, res) => {
    const id = req.params.id;
    const updatedProduct = {
        productName: req.body.productName,
        amount: req.body.amount,
        price: req.body.price,
        image: req.file.filename
    };
    connection.query('UPDATE products SET ? WHERE id = ?', [updatedProduct, id], (error) => {
        if (error) throw error;

        res.redirect('/products');
    });
}

module.exports = { makeNewUpdate, upload, updateProduct }