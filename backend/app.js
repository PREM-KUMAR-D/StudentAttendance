const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./util/database');
const attendance = require('./model/attendance');
const attendanceRoute = require('./routes/attendance');


const app = express();

sequelize
// .sync({force:true})
.sync();



app.use(cors());

app.use(bodyParser.json());

app.use('/attendance',attendanceRoute);


app.listen(4000);
