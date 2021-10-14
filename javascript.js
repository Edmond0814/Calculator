const content = document.querySelector(".content")
const keypad = document.querySelector(".keypad")
const buttons = document.querySelectorAll(".button")
const display = document.querySelector("#display")


let prevClickIsNumber = false
let prevClickIsAction =false
let figures = []
let figure = ''

const numbers = function(number){
 if (prevClickIsNumber){
   figure += number
    display.textContent = figure;
 }
 prevClickIsNumber=true
}

const actions = function(){
  console.log("action!")
}

const addition = function(a,b) {
	return a+b;
};

const subtraction = function(a,b) {
	return a-b;
};

const multiplication = function(arr) {
  return arr.reduce((total,nextValue)=>total*nextValue)
};

const power = function(a,b) {
	return a**b;
};



keypad.addEventListener("click", function(e){
    const action = e.target.dataset.key;
    
    switch(e.target.className){
      case "button number": numbers(action);
                            break;
      case "button action": actions(action);
                            break;
      case "button operator": operator();
    }
})