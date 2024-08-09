require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require('./api/user/user.router');

app.use(express.json()); 

app.use('/api/users', userRoutes);
app.listen(process.env.APP_PORT, () => {
    console.log("Working fine : ", process.env.APP_PORT)
})