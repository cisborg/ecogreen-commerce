const db = require('../config/database');

class Product {
    // Get all products
    static async getAll() {
        const result = await db.query('SELECT * FROM products');
        return result.rows;
    }

    // Create a new product
    static async create(vendor_id, name, description, price, category, stock_quantity, is_discounted) {
        const result = await db.query(
            'INSERT INTO products (vendor_id, name, description, price, category, stock_quantity, is_discounted) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [vendor_id, name, description, price, category, stock_quantity, is_discounted]
        );
        return result.rows[0];
    }

    // Get product by ID
    static async getById(product_id) {
        const result = await db.query('SELECT * FROM products WHERE product_id = $1', [product_id]);
        return result.rows.length ? result.rows[0] : null;
    }

    // Update product by ID
    static async update(product_id, vendor_id, name, description, price, category, stock_quantity, is_discounted) {
        const result = await db.query(
            'UPDATE products SET vendor_id = $1, name = $2, description = $3, price = $4, category = $5, stock_quantity = $6, is_discounted = $7 WHERE product_id = $8 RETURNING *',
            [vendor_id, name, description, price, category, stock_quantity, is_discounted, product_id]
        );
        return result.rows.length ? result.rows[0] : null;
    }

    // Delete product by ID
    static async delete(product_id) {
        const result = await db.query('DELETE FROM products WHERE product_id = $1 RETURNING *', [product_id]);
        return result.rows.length ? result.rows[0] : null;
    }
}

module.exports = Product;
