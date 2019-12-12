 const input = document.getElementById('input'); // input/output button
 const number = document.querySelectorAll('.numbers'); // number buttons
 const operator = document.querySelectorAll('.operators'); // operator buttons
 const root = document.querySelector('#rootBtn');// root button
 const powerTwo = document.querySelector('#powerTwoBtn');//Power 2 button
 const powerThree = document.querySelector("#powerThreeBtn")// Power 3 button
 const sin = document.querySelector("#sinBtn");//Sin button
 const cos = document.querySelector("#cosBtn");//Cos button
 const tan = document.querySelector("#tanBtn");//Tan button
 const exp = document.querySelector("#expBtn");//Exp button
 const correct = document.querySelector('#correct');//correct button
 const result = document.getElementById('result'); // equal button
 const clear = document.getElementById('clear'); // clear button
 let resultDisplayed = false; // flag to keep an eye on what output is displayed
 
 
document.addEventListener("keydown", function(){
    let keyShift = window.event.shiftKey ? true: false;
    if((keyShift == true && event.keyCode == 48) || event.keyCode == 96){input.innerHTML  += "0";};
    if((keyShift == true && event.keyCode == 49) || event.keyCode == 97){input.innerHTML += '1';};
    if((keyShift == true && event.keyCode == 50) || event.keyCode == 98){input.innerHTML += '2';};
    if((keyShift == true && event.keyCode == 51) || event.keyCode == 99){input.innerHTML += '3';};
    if((keyShift == true && event.keyCode == 52) || event.keyCode == 100){input.innerHTML +=  '4';};
    if((keyShift == true && event.keyCode == 53) || event.keyCode == 101){input.innerHTML += '5';};
    if((keyShift == true && event.keyCode == 54) || event.keyCode == 102){input.innerHTML += '6';};
    if((keyShift == true && event.keyCode == 55) || event.keyCode == 103){input.innerHTML += '7';};
    if((keyShift == true && event.keyCode == 56) || event.keyCode == 104){input.innerHTML += '8';};
    if((keyShift == true && event.keyCode == 57) || event.keyCode == 105){input.innerHTML += '9';};
    if(event.keyCode == 107 || event.keyCode == 187){input.innerHTML += "+";};
    if(event.keyCode == 109 || event.keyCode == 189){input.innerHTML += "-";};
    if(event.keyCode == 106 || event.keyCode == 88){input.innerHTML+= "&times;";};
    if(event.keyCode == 111 || event.keyCode == 191){input.innerHTML += "&divide;";};
    if(event.keyCode == 110 || event.keyCode == 190){input.innerHTML+= ".";};
    if(event.keyCode == 8){correctFunc();};
    if(event.keyCode == 32 || event.keyCode == 46){clearFunc();};
    if(event.keyCode == 13){resultOp();};
})


 // adding click handlers 
 for (let i = 0; i < number.length; i++) {
   number[i].addEventListener("click", function(e) {
 
     // storing current input string and its last character in variables - used later
     let currentString = input.innerHTML;
     let lastChar = currentString[currentString.length - 1];
 
     // if result is not displayed, just keep adding
     if (resultDisplayed === false ) {
       input.innerHTML += e.target.innerHTML;
     } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
       // if result is currently displayed and user pressed an operator
       // we need to keep on adding to the string for next operation
       resultDisplayed = false;
       input.innerHTML += e.target.innerHTML;
     } else {
       // if result is currently displayed and user pressed a number
       // we need clear the input string and add the new input to start the new opration
       resultDisplayed = false;
       input.innerHTML = "";
       input.innerHTML += e.target.innerHTML;
     }
 
   });
 }
 
 // adding click handlers to number buttons
 for (let j = 0; j < operator.length; j++) {
   operator[j].addEventListener("click", function(e) {
 
     // storing current input string and its last character in variables - used later
     let currentString = input.innerHTML;
     let lastChar = currentString[currentString.length - 1];
 
     // if last character entered is an operator, replace it with the currently pressed one
     if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
       let newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
       input.innerHTML = newString;
     } else if (currentString.length == 0) {
       // if first key pressed is an opearator, don't do anything
       console.log("enter a number first");
     } else {
       // else just add the operator pressed to the input
       input.innerHTML += e.target.innerHTML;
     }
 
   });
 }
 
 // on click of 'equal' button
 result.addEventListener("click", resultOp)
  function resultOp() {
 
   // this is the string that we will be processing eg. -10+26+33-56*34/23
   let inputString = input.innerHTML;
 
   // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
   let numbers = inputString.split(/\+|\-|\×|\÷|\√/g);
 
   // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
   // first we replace all the numbers and dot with empty string and then split
   let operators = inputString.replace(/[0-9]|\./g, "").split("");
 
   console.log(inputString);
   console.log(operators);
   console.log(numbers);
   console.log("----------------------------");
 
   // now we are looping through the array and doing one operation at a time.
   // first divide, then multiply, then subtraction and then addition
   // as we move we are alterning the original numbers and operators array
   // the final element remaining in the array will be the output
 
   let divide = operators.indexOf("÷");
   while (divide != -1) {
     numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
     operators.splice(divide, 1);
     divide = operators.indexOf("÷");
   }
 
   let multiply = operators.indexOf("×");
   while (multiply != -1) {
     numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
     operators.splice(multiply, 1);
     multiply = operators.indexOf("×");
   }
 
   let subtract = operators.indexOf("-");
   while (subtract != -1) {
     numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
     operators.splice(subtract, 1);
     subtract = operators.indexOf("-");
   }
 
   let add = operators.indexOf("+");
   while (add != -1) {
     // using parseFloat is necessary, otherwise it will result in string concatenation :)
     numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
     operators.splice(add, 1);
     add = operators.indexOf("+");
   }

   input.innerHTML = numbers[0]; // displaying the output
 
   resultDisplayed = true; // turning flag if result is displayed
 };


 //Root function
root.addEventListener("click", rootOf);
 function rootOf(){

    let finalRes = Math.sqrt(input.innerHTML);
    input.innerHTML = finalRes;
    resultDisplayed = true;

}

//Power 2 function
powerTwo.addEventListener("click", powerTwoOf);
function powerTwoOf(){
    let finalRes2 = (input.innerHTML)** 2;
    input.innerHTML = finalRes2;
    resultDisplayed = true;
}
//Power 3 function
powerThree.addEventListener("click", powerThreeOf);
function powerThreeOf(){
    let finalRes3 = (input.innerHTML)** 3;
    input.innerHTML = finalRes3;
    resultDisplayed = true;
}
//Correct function
correct.addEventListener("click", correctFunc)
function correctFunc(){
    let correction = input.innerHTML.slice(0,-1);
    input.innerHTML = correction;
}
//Sinus function
sin.addEventListener("click", sinus);
function sinus(){
    if(input.innerHTML = parseInt(input.innerHTML)){
        let sinusOp = Math.sin(input.innerHTML).toFixed(3);
    input.innerHTML = sinusOp;
    resultDisplayed = true;
    }
}

//Cosine function
cos.addEventListener("click", cosine);
function cosine(){
    if(input.innerHTML = parseInt(input.innerHTML)){
        let cosineOp = Math.cos(input.innerHTML).toFixed(3);
    input.innerHTML = cosineOp;
    resultDisplayed = true;
    }
}
//Tangent function
tan.addEventListener("click", tangent);
function tangent(){
    if(input.innerHTML = parseInt(input.innerHTML)){
        let tangentOp = Math.tan(input.innerHTML).toFixed(3);
    input.innerHTML = tangentOp;
    resultDisplayed = true;
    }
}
//Exponential function
exp.addEventListener("click", exponential);
function exponential(){
    let exponentialOp = Math.exp(input.innerHTML).toFixed(3);
    input.innerHTML = exponentialOp;
    resultDisplayed = true;
}
 // clearing the input on press of clear
 clear.addEventListener("click", clearFunc)
 function clearFunc() {
   input.innerHTML = " ";
 }