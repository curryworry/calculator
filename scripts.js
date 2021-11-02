/* Global Variables */

let firstValue = 0;
let secondValue = 0;
let operator = "";
let result = 0;
let clearScreen = false;
let lastClick = "";

/* Query Selectors */

const digits = document.querySelectorAll('.digit');

const clearButton = document.getElementById('clr-button');

const display = document.getElementById('display');

const operators=document.querySelectorAll('.operator');

const allElements = document.querySelector('*');

/* Event Listeners */
digits.forEach(digit=>
    digit.addEventListener('click', digitClicked));

clearButton.addEventListener('click',resetCalculator);

operators.forEach(operator=>operator.addEventListener('click',operatorClicked));

allElements.addEventListener('click',(e)=>{
    lastClick = e.target.classList.value;
})

/* Functions */

function digitClicked(e){
    /*if(firstValue>0){
        secondValue = parseInt(e.target.textContent);
        display.textContent = secondValue;
    }
    else{
        //firstValue = parseInt(e.target.textContent);
        display.textContent += e.target.textContent;
    }*/
    if(display.textContent=="0")
    {
        display.textContent="";
    }
    if(clearScreen == true){
        display.textContent="";
        clearScreen = false;
    }
    display.textContent += e.target.textContent; 
}

function displayResult(){
    display.textContent = result;
}

function operatorClicked(e){
    if(operator==""||operator=="="||lastClick=="operator"){
        operator = e.target.textContent;
        firstValue = parseInt(display.textContent);
        clearScreen = true;
    }
    else{
        secondValue = parseInt(display.textContent);
        result = operate(operator,firstValue,secondValue);
        result = Math.round((result + Number.EPSILON) * 10000) / 10000;
        displayResult();
        operator = e.target.textContent;
        firstValue = result;
        result = 0;
        clearScreen = true;
    }
}

function resetCalculator(e){
    display.textContent = "0";
    firstValue = 0;
    secondValue = 0;
    result = 0;
    operator = "";
}

function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b;
}

function operate(operator,a,b){
    switch(operator){
        case '+':
            return add(a,b);
            break;
        case '-':
            return subtract(a,b);
            break;
        case 'x':
            return multiply(a,b);
            break;
        case '/':
            return divide(a,b);
            break;
        default:
            console.log('Invalid operator');
    }
}