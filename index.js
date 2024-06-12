const formDate = document.getElementById('dateForm');
const divDefault = document.getElementById('default');
const dateSet = new Set(JSON.parse(localStorage.getItem('dateSet')) || []);


formDate.addEventListener('submit', dateForm);

var date ;
function dateForm(event) {
    event.preventDefault();
    const dateInput = event.target.date.value;
    date = dateInput;
    const d = new Date(dateInput);
    const unixDate = Math.floor(d.getTime() / 1000);

    if (!dateSet.has(unixDate)) {
        dateSet.add(unixDate);
        localStorage.setItem('dateSet', JSON.stringify(Array.from(dateSet)));
        // saveAttendance(dateInput);
    } else {
        display(dateInput);
    }
}

const attendanceForm = document.getElementById('attendanceForm');
attendanceForm.addEventListener('submit',saveAttendance);

function saveAttendance(event) {
    if(date === undefined){
        alert('Please select date Before Marking attendance');
        return ;
    }
    const attendanceData = new FormData(attendanceForm);
    const attendance = {};
    for (const [name, value] of attendanceData.entries()) {
        attendance[name] = value;
    }
    localStorage.setItem(`attendance_${date}`, JSON.stringify(attendance));
    alert('Attendance saved!');
}

function display(date) {
    if(date === undefined){
        alert('Please select date before marking attendance');
        return;
    }

    const storedAttendance = JSON.parse(localStorage.getItem(`attendance_${date}`));
    if (storedAttendance) {
        for (const name in storedAttendance) {
            const radioButtons = document.getElementsByName(name);
            for (const radioButton of radioButtons) {
                if (radioButton.value === storedAttendance[name]) {
                    radioButton.checked = true;
                }
            }
        }
        alert('Attendance data loaded!');
    }
}