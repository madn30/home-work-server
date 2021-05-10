const express = require('express');
const router = require('./router/userrouter');
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 5000;

require('./config/database');


app.use(cors())

app.use(express.json());

// app.use("/", (req, res) => {
//     res.json({ response: 'Server is up and running.' }).status(200);
// })

app.use('/api/users', router);


app.listen(PORT, () => {
    console.log("App is running on port " + PORT);
});


