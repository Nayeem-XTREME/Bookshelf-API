const express = require('express');
require('./src/db/connect');

const app = express();
const port = process.env.PORT || 3000;

const json = express.json();
app.use(json);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})