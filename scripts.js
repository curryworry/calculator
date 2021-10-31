/* Global Variables */

let firstValue = 0;
let secondValue = 0;
let operator = "";
let result = 0;

/* Query Selectors */

const digits = document.querySelectorAll('.digit');

const clearButton = document.getElementById('clr-button');

const display = document.getElementById('display');

const operators=document.querySelectorAll('.operator');

/* Event Listeners */
digits.forEach(digit=>
    digit.addEventListener('click', digitClicked));

clearButton.addEventListener('click',resetCalculator);

operators.forEach(operator=>operator.addEventListener('click',operatorClicked));

/* Functions */

function digitClicked(e){
    console.log(e);
    if(firstValue>0){
        secondValue = parseInt(e.target.textContent);
        display.textContent = secondValue;
    }
    else{
        firstValue = parseInt(e.target.textContent);
        display.textContent = firstValue;
    }
}

function displayResult(){
    display.textContent = result;
}

function operatorClicked(e){
    if(operator==""){
        operator = e.target.textContent;
    }
    else if(operator=="="){
        displayResult();
        operator = "";
        firstValue = 0;
        secondValue = 0;
        result = 0;
    }
    else{
        result = operate(operator,firstValue,secondValue);
        displayResult();
        operator = e.target.textContent;
        firstValue = result;
        result = 0;
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
        case '*':
            return multiply(a,b);
            break;
        case '/':
            return divide(a,b);
            break;
        default:
            console.log('Invalid operator');
    }
}