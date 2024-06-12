const Attendance = require('../model/attendance');

exports.addAttendance = (req,res,next)=>{
    const date = req.body.date;
    const d = new Date(date);
    const data = JSON.stringify(req.body.data);

    const returnData = Attendance.create({
        date:d,
        data: data
    })

    res.status(201).json(date);
}

exports.getAttendanceByDate = (req,res,next)=>{
    const date = req.query.date;
    Attendance.findByPk(date)
    .then( row => {
        if(row === null){
            res.status(200).json({data:null});
            return ;
        }

        res.status(200).json({data :JSON.parse(row.data)});
    })
    .catch(err => console.log(err));
}


exports.getLatestByDate = (req,res,next) =>{
    Attendance.findAll()
    .then(records => {
        let countJson = {};
        for(let record in records){
            let jsonData = JSON.parse(JSON.parse(records[record].data));
            for(key in jsonData){
                countJson[key] =  jsonData[key] + 1;
            }
        }
        console.log(countJson);
        res.status(200).json(countJson);

    })
    .catch(err => {
        console.error(err);
    });
}


exports.getRecordsLength = (req,res,next) =>{
    Attendance.findAll()
    .then(records => {
        res.status(200).json({length:records.length});
    })
    .catch(err => console.log(err));
}