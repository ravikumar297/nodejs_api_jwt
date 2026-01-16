require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
const userRoutes = require('./api/user/user.router');
const adminRoutes = require('./api/admin/admin.router');

app.use(express.json()); 

app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.listen(process.env.APP_PORT, () => {
    console.log("Working fine now please check in port : ", process.env.APP_PORT)
})