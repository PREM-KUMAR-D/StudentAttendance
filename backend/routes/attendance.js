const express = require('express');
const attendanceController = require('../controller/attendance');


const router = express.Router();

router.get('/get-attendance',attendanceController.getAttendanceByDate);

router.post('/add-attendance',attendanceController.addAttendance);

router.get('/get-latest',attendanceController.getLatestByDate);

router.get('/get-records-length',attendanceController.getRecordsLength);


module.exports = router;