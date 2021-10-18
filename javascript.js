const content = document.querySelector(".content")
const keypad = document.querySelector(".keypad")
const display = document.querySelector("#display")

let alerted = false
let figures = []
let figure = ''

const operand = function(number){
  if (figures.length==1&&!figure)
    clear_all();

  if (isNumber(figure)){
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
  if (figure) figures.push(remove_extra_decimal(figure))

  figure = arithmetic
  display.textContent=figure
}

const multiply_divide = function(arithmetic){
  if (prevIsMultiplyDivide()){
    alert_msg();
    figures.pop     
  }
  else if (!isNumber(figure)&&!(figures.length==1&&!figure)){
    alert("No value to multiply or divide!")
    return;
  }
  else if (figure){
    figures.push(remove_extra_decimal(figure))
  }

  figure = arithmetic
  display.textContent=figure
}

const isNumber =function(str){
  return ((/[1-9.]/i).test(str))
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
  else if(figures.length==1&&!figure){
    clear_all()
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
  if (isNumber(figure)){
    figures.push(remove_extra_decimal(figure))
    figure=''
  }
  else{
    alert("Cannot end with operator!")
    return;
  }

  combine_plus_minus()

  strings_to_numbers()

  arithmetic_presedence()

  let sum=figures.reduce(function(total,nextOne){
    total = total+nextOne
    return total;      
  })

  sum = Number(sum.toFixed(6).toString())
  figures=[]
  figures.push(sum)

  display.textContent=figures[0];
}

const combine_plus_minus = function(){
  figures=figures.reduce(function(previousOne,currentOne,index,arr){
    if (currentOne=='+'||currentOne=='-'){
       let minus_count=0;
       let end_point=index;
       while(!isNumber(arr[end_point])){
         if (arr[end_point]=='-') minus_count++
         end_point++;
       }
       let combined = minus_count%2? "-":"+" 
       arr.splice(index,end_point-index,combined)
   }
   return arr;
 },[]) 
}

const strings_to_numbers = function(){
  for (let index = 0; index < figures.length; index++) {
    if (figures[index]=="+"||figures[index]=="-"){
      let combined = (figures[index]=="+")? 
      Number(figures[index+1]):-Number(figures[index+1])
      figures.splice(index,2,combined)
    }
    else if (isNumber(figures[index])){
      figures.splice(index,1,Number(figures[index]))
    }
  }
}

const arithmetic_presedence = function(){
  for (let index = 0; index < figures.length; index++) {
    if (figures[index]=="x"||figures[index]=="/"){
      let result = (figures[index]=="x")?
      figures[index-1]*figures[index+1]:figures[index-1]/figures[index+1]
      figures.splice(index-1,3,result)
    }
  }
}

const remove_extra_decimal = function(str){
  let index =str.lastIndexOf('.')
  return str.slice(0,index).split('.').join('').concat(str.slice(index))
}

keypad.addEventListener("click", function(e){
    const button = e.target.dataset.key;
    
    switch(e.target.className){
      case "button operand": operand(button);
                            break;
      case "button action": actions(button);
                            break;
      case "button operator": operator(button);
                              break;
      case "button operate": operate();
                              break;
    }
})

document.addEventListener('keydown',function(event){
  console.log(event);
  let operators = ['+','-','x','/']
  let action = ['Backspace','Delete']
  if (isNumber(event.key)){
    operand(event.key)
  }
  else if(operators.indexOf(event.key)!=-1){
    operator(event.key)
  }
  else if (action.indexOf(event.key)!=-1){
    actions('delete')
  }
  else if (event.key=='='||event.key=='Enter')
    operate()
})