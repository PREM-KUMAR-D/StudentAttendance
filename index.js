const formDate = document.getElementById('dateForm');
const divDefault = document.getElementById('default');
const attendanceForm = document.getElementById('attendanceForm');
const fetchReport = document.getElementById('fetchReportButton');
const divDisplay = document.getElementById('display');



formDate.addEventListener('submit', dateForm);
fetchReport.addEventListener('click', displayReport);
attendanceForm.addEventListener('submit', saveAttendance);

var d;



function dateForm(event) {
    event.preventDefault();


    divDisplay.style.display = 'none';
    divDefault.style.display = 'block';
    const dateInput = event.target.date.value;
    d = dateInput;

    if (d === null) {
        alert('Please select a date For Attendance !');
        return;
    }

    axios.get(`http://localhost:4000/attendance/get-attendance?date=${dateInput}`)
        .then(result => {
            let obj = result.data.data;
            if (obj !== null) {
                display(dateInput);
            }


        })
        .catch(err => console.log(err));
}



function saveAttendance(event) {
    event.preventDefault();

    if (d === undefined) {
        alert('Please select date Before Marking attendance');
        return;
    }
    const attendanceData = new FormData(attendanceForm);
    const attendance = {};
    for (const [name, value] of attendanceData.entries()) {
        attendance[name] = value;
    }


    let countJson = {};
    for (key in attendance) {
        let name = key.split('_')[1];
        if (attendance[key] === 'present') {

            countJson[name] = (countJson[name] === undefined) ? 1 : countJson[name] + 1;
        } else {
            countJson[name] = 0;
        }
    }
    // localStorage.setItem(`attendance_${date}`, JSON.stringify(attendance));

    let jsonString = JSON.stringify(countJson);
    axios.post('http://localhost:4000/attendance/add-attendance', {
        date: d,
        data: jsonString
    })
        .then(() => alert('Attendance saved!'))
        .catch(err => console.log(err));




}

function display(dateInput) {


    let storedAttendance;
    axios.get(`http://localhost:4000/attendance/get-attendance?date=${dateInput}`)
        .then(result => {
            storedAttendance = result.data.data;

            if (storedAttendance) {
                storedAttendance = JSON.parse(storedAttendance);

                for (const name in storedAttendance) {
                    const attendanceStatus = storedAttendance[name];
                    const presentRadio = document.querySelector(`input[name="attendance_${name}"][value="present"]`);
                    const absentRadio = document.querySelector(`input[name="attendance_${name}"][value="absent"]`);

                    if (attendanceStatus === 1) {
                        presentRadio.checked = true;
                    } else {
                        absentRadio.checked = true;
                    }
                }

                alert('Attendance data loaded!');
            }

        })

}

function displayReport() {

    divDefault.style.display = 'none';
    divDisplay.style.display = 'block';

    axios.get(`http://localhost:4000/attendance/get-latest`)
        .then(result => {
            let countJson = result.data;
            renderJson(countJson);
        })
        .catch(err => console.log(err));


}

function renderJson(countJson) {

    axios.get(`http://localhost:4000/attendance/get-records-length`)
        .then(obj => {
            let len = obj.data.length;
            if (len === 0) {
                return;
            }

            const ulElem = document.getElementById('unordered');

            for (key in countJson) {

                const listItem = document.createElement('li');
                const itemText = document.createElement('p');
                const percent = countJson[key] / len * 100;
                itemText.textContent = `${key}: ${percent} % `;
                listItem.appendChild(itemText);
                ulElem.appendChild(listItem);
            }
            // axios.get(`http://localhost:4000/attendance/get-records-length`)
            //     .then(result => {
            //     })




        })
        .catch(err => console.log(err));

    console.log(countJson);
}