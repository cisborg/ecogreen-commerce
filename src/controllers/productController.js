const Product = require('../models/productModel');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Database connection error' });
    }
};

// Create new product
exports.createProduct = async (req, res) => {
    const { vendor_id, name, description, price, category, stock_quantity, is_discounted } = req.body;
    try {
        const newProduct = await Product.create(vendor_id, name, description, price, category, stock_quantity, is_discounted);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    const product_id = parseInt(req.params.id);
    try {
        const product = await Product.getById(product_id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
    const product_id = parseInt(req.params.id);
    const { vendor_id, name, description, price, category, stock_quantity, is_discounted } = req.body;
    try {
        const updatedProduct = await Product.update(product_id, vendor_id, name, description, price, category, stock_quantity, is_discounted);
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
    const product_id = parseInt(req.params.id);
    try {
        const deletedProduct = await Product.delete(product_id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};
