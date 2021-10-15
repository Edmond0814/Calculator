const content = document.querySelector(".content")
const keypad = document.querySelector(".keypad")
const display = document.querySelector("#display")


let prevIsNumber = true
let prevIsMultiplyDivide =false
let figures = []
let figures_precedence = []
let figure = ''

const operand = function(number){
  figure += number
  display.textContent = figure;
  prevIsNumber=true
}

const operator = function(arithmetic){
  
  if(arithmetic=='multiply'||arithmetic=='divide'){
    if (prevIsMultiplyDivide!=true){
      if (figure.length!=0){
        figures_precedence.push(figure)
        figure=''
      }
      prevIsMultiplyDivide=true
    }
    else {
      let alerted = sessionStorage.getItem('alerted')||'';
      if (alerted!='yes'){
        alert("If you enter multiply and divide together,\
         the latter operator will take place")
        sessionStorage.setItem('alerted','yes')
      } 
    }
  }  
  prevIsNumber=false
}

const actions = function(action){
  if (action == 'delete'){
    if(prevIsNumber){
      figure = figure.slice(0,-1)
    }
    else {
      display.textContent=figures[-1]
    }
    display.textContent=figure
  }
  else{
    figure=''
    figures=[]
    figures_precedence=[]
    display.textContent=''
  }
}

const addition = function(a,b) {
	return a+b;
};

const subtraction = function(a,b) {
	return a-b;
};

const multiplication = function(a,b) {
  return a*b
};

const division = function(a,b){
  return a/b
}

const power = function(a,b) {
	return a**b;
};


keypad.addEventListener("click", function(e){
    const button = e.target.dataset.key;
    
    switch(e.target.className){
      case "button operand": operand(button);
                            break;
      case "button action": actions(button);
                            break;
      case "button operator": operator(button);
                              break;
      case "button operate": operate(button);
                              break;
    }
})