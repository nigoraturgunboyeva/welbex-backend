const mongoose = require('mongoose');

module.exports = function (app){
    const port = process.env.PORT || 5100;
    mongoose.connect(process.env.CONNECTION_STR)
    .then(()=> {
        console.log("Connected to MongoDB...");
        app.listen(port, () => console.log(`port ${port} is running...`));
    })
    .catch((error)=> console.log("Error while connecting to mongoDB" + error))

}