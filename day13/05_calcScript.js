const printResult = document.querySelector(".printResult");
const reset = document.querySelector(".reset");

let currentInput = '';
let operator = '';
let isCalc = false;
let num1 = 0;
let num2 = 0;

const onClickNum = (el) => {
    if (isCalc && !['+', '-', '*', '/'].includes(el)) {
        printResult.innerText = '0';
        currentInput = '';
        isCalc = false;
    }

    if (['+', '-', '*', '/'].includes(el)) {
        if (currentInput === ''){ 
            return;
        };
        
        num1 = Number(currentInput);
        operator = el;
        currentInput = ''; 

        printResult.innerText += `${el}`;  

        isCalc = false;

    } else {
        if (printResult.innerText === '0') {
            printResult.innerText = '';
            currentInput = ''; 
        }
        
        currentInput += el;
        printResult.innerText += el;
    }
}


const onClickCalc = () => {
    if (num1 === null || operator === null || currentInput === '') return;

    let num2 = Number(currentInput); 
    let result = 0;
    
    switch(operator) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': 
            result = num2 !== 0 ? (num1 / num2).toFixed(2) : "Error"; 
            break;
    }


    printResult.innerText = result;
    currentInput = result.toString();
    num1 = '';
    operator = '';

    isCalc = true;
}



const resetOnClick = () => {
    window.location.reload();
}
