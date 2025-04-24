const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'example',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// User Authentication Endpoints
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0 || results[0].password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', token: 'dummy-token' });
    });
});

app.post('/api/register', (req, res) => {
    const { username, email, password, phoneNumber } = req.body;

    if (!username || !email || !password || !phoneNumber) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = 'INSERT INTO users (username, email, password, phoneNumber) VALUES (?, ?, ?, ?)';
    db.query(query, [username, email, password, phoneNumber], (err) => {
        if (err) {
            console.error('Error inserting user into database:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

// Food List Endpoint
app.get('/api/foods', (req, res) => {
    console.log('Received request for /api/foods'); // Log every request
    const query = 'SELECT * FROM foods';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching foods from database:', err.message);
            return res.status(500).json({ message: 'Database query failed', error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No foods found' });
        }
        res.status(200).json(results);
    });
});



// Add to Cart Endpoint
app.post('/api/cart', (req, res) => {
    const { foodId, userId } = req.body;
    console.log(foodId, userId);

    if (!foodId || !userId) {
        return res.status(400).send({ error: 'foodId and userId are required' });
    }

    const query = 'INSERT INTO cart (food_id, user_id) VALUES (?, ?)';
    db.query(query, [foodId,userId], (err) => {
        if (err) {
            console.error('Error adding to cart:', err);
            return res.status(500).send({ error: 'Failed to add to cart' });
        }
        res.status(200).send({ message: 'Item added to cart successfully!' });
    });
});

  
  

app.get('/api/cart/count', (req, res) => {
    const { userId } = req.query;  // Assume userId is passed as a query parameter

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    const query = 'SELECT COUNT(*) AS cartCount FROM cart WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching cart count:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json({ cartCount: results[0].cartCount });
    });
});


// Add to Favorites Endpoint
app.post('/api/favorites', (req, res) => {
    const { foodId } = req.body;

    if (!foodId) {
        return res.status(400).json({ message: 'Food ID is required' });
    }

    const query = 'INSERT INTO favorites (foodId) VALUES (?)';
    db.query(query, [foodId], (err) => {
        if (err) {
            console.error('Error adding to favorites:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({ message: 'Item added to favorites' });
    });
});

app.get('/api/cart', (req, res) => {
    const { userId } = req.query; // Assume userId is passed as a query parameter

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    const query = `
        SELECT cart.id, foods.name, foods.price, cart.food_id, COUNT(cart.food_id) AS quantity
        FROM cart
        JOIN foods ON cart.food_id = foods.id
        WHERE cart.user_id = ?
        GROUP BY cart.food_id
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching cart items:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No items in cart' });
        }

        res.status(200).json(results);
    });
});

// Save Checkout Details Endpoint
app.post('/api/checkout', (req, res) => {
    const {
        userId,
        receptionName,
        phoneNumber,
        district,
        city,
        address,
        zipCode,
        cardNumber,
        nameOnCard,
        expiryDate,
        cvv,
    } = req.body;

    if (
        !userId ||
        !receptionName ||
        !phoneNumber ||
        !district ||
        !city ||
        !address ||
        !zipCode ||
        !cardNumber ||
        !nameOnCard ||
        !expiryDate ||
        !cvv
    ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = `
        INSERT INTO orders (
            user_id, reception_name, phone_number, district, city, address,
            zip_code, card_number, name_on_card, expiry_date, cvv
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            userId,
            receptionName,
            phoneNumber,
            district,
            city,
            address,
            zipCode,
            cardNumber,
            nameOnCard,
            expiryDate,
            cvv,
        ],
        (err) => {
            if (err) {
                console.error('Error saving order:', err);
                return res.status(500).json({ message: 'Database error' });
            }

            res.status(201).json({ message: 'Order placed successfully' });
        }
    );
});



// Server Start
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
