const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true 
})
.then((con) => {
    console.log("Database connection sucessfull..");
})
.catch(error => {
    console.log(error);
})