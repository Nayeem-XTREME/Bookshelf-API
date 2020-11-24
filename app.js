const express = require('express');
require('./src/db/connect');

const userRouter = require('./src/routers/user');
const bookRouter = require('./src/routers/book');

const app = express();
const port = process.env.PORT || 3000;

const json = express.json();
app.use(json);
app.use(userRouter);
app.use(bookRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})