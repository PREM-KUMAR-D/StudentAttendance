const formDate = document.getElementById('dateForm');
const divDefault = document.getElementById('default');

formDate.addEventListener('submit',dateForm);


const dateSet = new Set();

function dateForm(event){
    let d = new Date(event.target.date.value);
    let unixDate = Math.floor(d.getTime() / 1000);

    if(!dateSet.has(unixDate)){
        // add new and display
        // so do nothing

        dateSet.add(unixDate);

    }else{
        display();
    }

}

function display(){
    divDefault.style= 'none'
}