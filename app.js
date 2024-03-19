const express = require("express");
const app = express();
require("dotenv").config();

const userRouters = require('./router/user')
const bodyparser = require("body-parser")
const cors = require("cors")
const mongoose = require('mongoose')



app.use(bodyparser.json({ limit: '100mb' }));
app.use(bodyparser.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyparser.json());
app.use(cors())


mongoose.connect('mongodb+srv://Shrikantkhare1:Shrikant@cluster0.qch0g.mongodb.net/freelanceing1?retryWrites=true&w=majority')
.then(() => { console.log("Database is connected...")
 })

 app.use('/', userRouters)

app.listen(5000, () =>
  console.log(`server is running on port 5000`)
);





 