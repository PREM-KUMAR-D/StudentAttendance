const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Attendance = sequelize.define('attendance',{
    date:{
        type: Sequelize.DATEONLY,
        allowNull: false,
        primaryKey: true
    },
    data:{
        type: Sequelize.TEXT
    }
});

module.exports = Attendance;