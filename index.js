const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const pool = require('../config/database');

const carbonRoutes = require('./src/routes/carbonCalculatorRoutes');
const authRoutes = require('./src/routes/authRoutes');
const messageRoutes = require('./src/routes/messageRoutes');
const quickActionsRoutes = require('./src/routes/quickActionsRoutes');
const leaderRoutes = require('./src/routes/leaderBoardRoutes');
const squadRoutes = require('./src/routes/squadRoutes');
const squadMembersRoutes = require('./src/routes/squadMembersRoutes');
const transactionRoutes = require('./src/routes/transactionRoutes');
const vendorRoutes = require('./src/routes/vendorRoutes');
const productRoutes = require('./src/routes/productRoutes');
const donationRoutes = require('./src/donationRoutes');
const activityRoutes = require('./src/routes/activityRoutes');
const focusValueRoutes = require('./src/routes/focusValueRoutes');
const pointsRoutes = require('./src/pointsRoutes');



app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/', carbonRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', activityRoutes);
app.use('/api/', notificationsRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/', focusValueRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/products', productRoutes);
app.use('/api/', quickActionsRoutes);
app.use('/api/', leaderRoutes);
app.use('/api/squads', squadRoutes);
app.use('/api/squad_members', squadMembersRoutes);
app.use('/api/', pointsRoutes);

// Connect to PostgreSQL database

pool.connect((err, client) => {
    if (err) {
        console.error('Connection to PostgreSQL failed', err.stack);
    } else {
        console.log('Connected to PostgreSQL');
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res ) => {
    console.log(`Server running on port ${PORT}`);
});