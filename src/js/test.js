const colorOn = 'green';
const colorOff = 'red';
var isOn = false; 

function changeColor(){
    isOn = !isOn;    
    if(isOn){
        document.getElementById("main-area").style.color = colorOn;
    }else{
        document.getElementById("main-area").style.color = colorOff;
    }    
}
