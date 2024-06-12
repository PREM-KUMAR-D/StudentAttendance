const Sequelize = require('sequelize')

const sequelize = new Sequelize('student-attendance','root','MPasssword@123',{
    dialect:'mysql',host:'localhost'
});

module.exports = sequelize;