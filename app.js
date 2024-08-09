require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
const userRoutes = require('./api/user/user.router');

app.use(express.json()); 

app.use(cors());
app.use('/api/users', userRoutes);
app.listen(process.env.APP_PORT, () => {
    console.log("Working fine now please check in port : ", process.env.APP_PORT)
})