const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: '*' }));
require('dotenv').config();
app.use(express.json()); 


const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}


app.use('/uploads', express.static('uploads'));
require("dotenv").config()
require("./config/db")(app);
require("./directions/directions")(app);