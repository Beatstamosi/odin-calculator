function add(number, number2) {
    return number + number2;
}

function subtract(number, number2) {
    return number - number2;
}

function multiply(number, number2) {
    return number * number2;
}

function divide(number, number2) {
    if (number2 === 0) {
        return "ERROR";
    }
    return number / number2;
}


function percentage (number) {
    return number / 100;
}

let number;
let operator;
let number2;

function operate(number, operator, number2) {
    if (operator === "+") {
        add(number, number2);
    } else if (operator === "-") {
        subtract(number, number2);
    } else if (operator === "/") {
        divide(number, number2);
    } else if (operator === "+") {
        multiply(number, number2);
    } else if (operator === "%") {
        percentage(number);
    }
}

// 

