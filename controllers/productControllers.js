const connection = require('../model/db');

const getAllProducts = (req, res) => {
    connection.query('SELECT * FROM products', (error, results) => {
        if (error) throw error;
        res.render('addItems', {products: results, isLoggedIn: true});
    });
}

const createNewProduct = (req, res) => {
    const product = {
        productName: req.body.productName,
        amount: req.body.amount,
        price: req.body.price,
        image: req.body.image
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

const updateProduct = (req, res) => {
    const id = req.params.id;
    const updatedProduct = {
        productName: req.body.productName,
        amount: req.body.amount,
        price: req.body.price,
        image: req.body.image
    };
    connection.query('UPDATE products SET ? WHERE id = ?', [updatedProduct, id], (error) => {
        if (error) throw error;

        res.redirect('/products');
    });
}

module.exports = {getAllProducts, createNewProduct, deleteProducts, makeNewUpdate, updateProduct}