const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const pool = require('../config/dataBs');
const rankingRoutes = require('./src/routes/rankingRoutes');
const awardsRoutes = require('./src/routes/awardsRoutes');
const activitiesRoutes = require('./src/routes/activityRoutes');
const notificationsRoutes = require('./src/routes/notificationsRoutes');
const vendorRoutes = require('./src/routes/vendorRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const gcpsRoutes = require('./src/routes/gcpsActivityRoutes');
const userRoutes = require('./src/routes/userRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const referralRoutes = require('./src/routes/referralRoutes');


app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/api/rankings', rankingRoutes);
app.use('/api/awards', awardsRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/gcpActivities', gcpsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/referrals', referralRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res ) => {
    console.log(`Server running on port ${PORT}`);
});