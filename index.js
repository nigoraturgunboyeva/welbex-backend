const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: '*' }));
require('dotenv').config();
app.use(express.json()); 


app.use('/uploads', express.static('uploads'));

require("dotenv").config()
require("./config/db")(app);
require("./directions/directions")(app);