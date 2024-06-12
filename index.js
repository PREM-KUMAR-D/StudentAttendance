const formDate = document.getElementById('dateForm');
const divDefault = document.getElementById('default');
const dateSet = new Set(JSON.parse(localStorage.getItem('dateSet')) || []);
const fetchReport = document.getElementById('fetchReportButton');
const divDisplay = document.getElementById('display');



formDate.addEventListener('submit', dateForm);
fetchReport.addEventListener('click', displayReport);


var date;
var countJson = {};


function dateForm(event) {
    event.preventDefault();

    divDisplay.style.display = 'none';
    divDefault.style.display = 'block';
    const dateInput = event.target.date.value;
    date = dateInput;
    const d = new Date(dateInput);
    const unixDate = Math.floor(d.getTime() / 1000);

    if (!dateSet.has(unixDate)) {
        dateSet.add(unixDate);
        localStorage.setItem('dateSet', JSON.stringify(Array.from(dateSet)));

    } else {
        display(dateInput);
    }
}

const attendanceForm = document.getElementById('attendanceForm');
attendanceForm.addEventListener('submit', saveAttendance);

function saveAttendance() {
    if (date === undefined) {
        alert('Please select date Before Marking attendance');
        return;
    }
    const attendanceData = new FormData(attendanceForm);
    const attendance = {};
    for (const [name, value] of attendanceData.entries()) {
        attendance[name] = value;
    }

    for (key in attendance) {
        let name = key.split('_')[1];
        if (attendance[key] === 'present') {

            countJson[name] = (countJson[name] === undefined) ? 1 : countJson[name] + 1;
        } else {
            countJson[name] = 0;
        }
    }
    
    localStorage.setItem(`attendance_${date}`, JSON.stringify(attendance));
    alert('Attendance saved!');
}

function display() {


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

function displayReport() {

    divDefault.style.display = 'none';
    divDisplay.style.display = 'block';
    
    
  
    renderJson(countJson);
}

function renderJson(countJson) {

    const ulElem = document.getElementById('unordered');
    const total = dateSet.size;

    for (key in countJson) {

        const listItem = document.createElement('li');
        const itemText = document.createElement('p');
        const percent = Math.floor(countJson[key] /total) * 100 ;
        itemText.textContent = `${key}: ${percent} % `;
        listItem.appendChild(itemText);
        ulElem.appendChild(listItem);
    }
    console.log(countJson);
}