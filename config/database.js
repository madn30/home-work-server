const mongoose = require('mongoose');
const CONNECT = process.env.DB_URL || "mongodb+srv://idan:idan@cluster0.mgzcr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(connect => console.log("connect"))

