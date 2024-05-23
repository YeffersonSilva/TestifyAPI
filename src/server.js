const express = require('express');
const app = express();
require('dotenv').config();
const users = require('./routes/users');

app.use(express.json());
app.use('/users', users.router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
