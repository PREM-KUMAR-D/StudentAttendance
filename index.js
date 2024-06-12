document.addEventListener('DOMContentLoaded', () => {
    const formDate = document.getElementById('dateForm');
    const divDefault = document.getElementById('default');
    const dateSet = new Set(JSON.parse(localStorage.getItem('dateSet')) || []);
    
    formDate.addEventListener('submit', dateForm);

    function dateForm(event) {
        event.preventDefault();
        const dateInput = event.target.date.value;
        const d = new Date(dateInput);
        const unixDate = Math.floor(d.getTime() / 1000);

        if (!dateSet.has(unixDate)) {
            dateSet.add(unixDate);
            localStorage.setItem('dateSet', JSON.stringify(Array.from(dateSet)));
            saveAttendance(dateInput);
        } else {
            display(dateInput);
        }
    }

    function saveAttendance(date) {
        const attendanceForm = document.getElementById('attendanceForm');
        const attendanceData = new FormData(attendanceForm);
        const attendance = {};
        for (const [name, value] of attendanceData.entries()) {
            attendance[name] = value;
        }
        localStorage.setItem(`attendance_${date}`, JSON.stringify(attendance));
        alert('Attendance saved!');
    }

    function display(date) {
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
});
