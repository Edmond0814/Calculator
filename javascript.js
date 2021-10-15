const content = document.querySelector(".content")
const keypad = document.querySelector(".keypad")
const display = document.querySelector("#display")

let alerted = false
let figures = []
let figure = ''

const operand = function(number){
  if (prevIsNumber()){
    figure +=number
  }
  else {
    if(figure) figures.push(figure)
    figure=number
  }
  display.textContent = figure;
}

const operator = function(arithmetic){
  (arithmetic=='x'||arithmetic=='/')?
  multiply_divide(arithmetic):plus_minus(arithmetic);
}

const plus_minus = function(arithmetic){
  if (figure) figures.push(figure)

  figure = arithmetic
  display.textContent=figure
}

const multiply_divide = function(arithmetic){
  if (prevIsMultiplyDivide()){
    alert_msg();
    figures.pop     
  }
  else if (!prevIsNumber()){
    alert("No value to multiply or divide!")
    return;
  }
  else{
    figures.push(figure)
  }

  figure = arithmetic
  display.textContent=figure
}

const prevIsNumber =function(){
  return ((/[1-9]/i).test(figure))
}

const prevIsMultiplyDivide = function(){
  return (figure=="x"||figure=="/")
}

const actions = function(action){
  (action == 'delete')? del():clear_all()
}

const del = function(){
  if(figure&&figure.length>1){
    figure = figure.slice(0,-1)
  }
  else {
    (figures.slice(-1))? figure = figures.pop():figure=''
  }
  display.textContent=figure
}


const alert_msg = function(){
  if (!alerted){
    alert("If you enter multiply and divide together,\
the latter operator will take place")
    alerted = true
  } 
}

const clear_all = function(){
  figure=''
  figures=[]
  display.textContent=''
}

const operate = function(){
  if (prevIsNumber()){
    figures.push(figure)
  }
  else{
    alert("Cannot end with operator!")
    return;
  }

  figures.indexOf
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