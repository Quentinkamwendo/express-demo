const connection = require('../model/db');
const multer = require('multer');
const path = require("path");

const getAllProducts = (req, res) => {
    connection.query('SELECT * FROM products', (error, results) => {
        if (error) throw error;
        res.render('addItems', {products: results, isLoggedIn: true});
    });
}
const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

function checkFileType(file, callback) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return callback(null, true);
    } else {
        callback('Error: Images Only');
    }
}

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        checkFileType(file, callback);
    }
});

const createNewProduct = (req, res) => {
    const product = {
        productName: req.body.productName,
        amount: req.body.amount,
        price: req.body.price,
        image: req.file.filename
    };

    connection.query(`INSERT INTO products SET ?`, [product], (error) => {
        if (error) throw error;
        res.redirect('/products');
    });
}

const deleteProducts = (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM products WHERE id = ?', [id], (error) => {
        if (error) throw error;
        res.redirect('/products');
    });
}

// const makeNewUpdate = (req, res) => {
//     const id = req.params.id;
//     connection.query(`SELECT * FROM products WHERE id = ?`, [id], (error, results) => {
//         if (error) {
//             console.error(error);
//             res.send(500);
//             return;
//         }
//         res.render('updateForm', { products: results[0], isLoggedIn: true });
//     });
// }
// const update = multer.diskStorage({
//     destination: 'public/uploads',
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
//
// const newUpload = multer({ update });
//
// const updateProduct = (req, res) => {
//     const id = req.params.id;
//     const updatedProduct = {
//         productName: req.body.productName,
//         amount: req.body.amount,
//         price: req.body.price,
//         image: req.file.filename
//     };
//     connection.query('UPDATE products SET ? WHERE id = ?', [updatedProduct, id], (error) => {
//         if (error) throw error;
//
//         res.redirect('/products');
//     });
// }

module.exports = {getAllProducts, createNewProduct, upload, deleteProducts }