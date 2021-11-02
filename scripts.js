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

const decimalButton = document.getElementById('decimal-btn');

const backspaceButton = document.getElementById('backspace');

/* Event Listeners */
digits.forEach(digit=>
    digit.addEventListener('click', digitClicked));

clearButton.addEventListener('click',resetCalculator);

operators.forEach(operator=>operator.addEventListener('click',operatorClicked));

allElements.addEventListener('click',(e)=>{
    lastClick = e.target.classList.value;
})

backspaceButton.addEventListener('click',backspaceClicked);

document.addEventListener('keydown',keyPressed);

/* Functions */

function keyPressed(e){
    console.log(e.key);
    let digitKeys=['1','2','3','4','5','6','7','8','9','0','.'];
    let operators=['+','-','*','x','/',"=","Enter"];
    if(digitKeys.includes(e.key)){
        digitCaptured(e.key);
    }
    if(operators.includes(e.key)){
        operatorCaptured(e.key);
    }
    if(e.key=="Backspace"){
        backspaceClicked(e.key);
    }
}

function digitClicked(e){
    let clickedDigit = e.target.textContent;
    digitCaptured(clickedDigit);
}

function operatorClicked(e){
    let clickedOperator = e.target.textContent;
    operatorCaptured(clickedOperator);
}

function digitCaptured(e){
    if(display.textContent=="0")
    {
        display.textContent="";
    }
    if(clearScreen == true){
        display.textContent="";
        clearScreen = false;
    }
    if(firstValue.toString().length>15||isNaN(firstValue)){
        displayRestartMessage();
    }
    display.textContent += e; 
    if(display.textContent.length>15){
        displayRestartMessage();
    }
    if(display.textContent.includes(".")){
        decimalButton.disabled = true;
    }
}

function displayRestartMessage(){
    display.textContent="Number too long. CLEAR to restart.";
}

function displayResult(){
    display.textContent = result;
    if(display.textContent.length>15){
        displayRestartMessage();
    }
    else if(isNaN(result)){
        display.textContent="Don't be mean. CLEAR to restart";
    }
}

function operatorCaptured(e){
    decimalButton.disabled = false;
    if(display.textContent.includes("restart")){
        displayRestartMessage();
    }
    if(operator==""||operator=="="||lastClick=="operator"||operator=="Enter"){
        operator = e;
        firstValue = parseFloat(display.textContent);
        clearScreen = true;
    }
    else{
        secondValue = parseFloat(display.textContent);
        result = operate(operator,firstValue,secondValue);
        result = Math.round((result + Number.EPSILON) * 10000) / 10000; //rounds to 4 decimal places
        displayResult();
        operator = e;
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
    decimalButton.disabled = false;
    clearScreen = false;
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
    if(b==0){
        display.textContent="Don't be mean. CLEAR to restart";
    }
    else{
    return a / b;
    }
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

function backspaceClicked(e){
    let str = display.textContent;
    if(str!=="0"){
    display.textContent = str.substring(0, str.length - 1);
    }
}