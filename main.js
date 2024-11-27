let number = [];
let operator = null;
let number2 = [];
let display = document.querySelector(".display");
let equalButtonPushed = false;


// set up number buttons
Array.from(document.querySelectorAll(".number")).forEach(button => {
    button.addEventListener("click", () => {
        getInputValue(button.value);
    });
})

// set up operator buttons
Array.from(document.querySelectorAll(".operator")).forEach(button => {
    button.addEventListener("click", () => {
        operatorAction(button);
    });
})

// set up equal button
document.querySelector("#equal").addEventListener("click", () => {
    operate(number, operator, number2);
    equalButtonPushed = true;
})

// set up toggle-negative button
document.querySelector(".toggle-negative").addEventListener("click", toggleNegative);


// set up clear button
document.querySelector("#clear").addEventListener("click", clear);

// set up keyboard input
document.addEventListener("keydown", handleKeyboardInput);


function handleKeyboardInput (event) {
    let key = event.key;

    if (key >= "0" && key <= "9" || key === ".") {
        getInputValue(key);

    } else if (key === "+" || key === "-" || key === "*" || key === "/" || key === "%") {

        // indicate which operator has been pressed
        htmlButton = document.querySelector(`button[value="${key}"]`);
        htmlButton.focus();
        setTimeout(() => {
            htmlButton.blur();
        }, 700);

        operatorAction(key);

    } else if (key === "Enter" || key === "=") {
        operate(number, operator, number2);
        equalButtonPushed = true;
    } else if (key === "Backspace" || key === "Delete") {
        clear();
    } 
}


function operatorAction (button) {

    // allow to continue math operations after pressing equal
    if (equalButtonPushed) {
        equalButtonPushed = false;
    }

    if (number2.length > 0) {
        result = operate(number, operator, number2);
        processResult(result);
    }

    // handle input via click or keyboard
    if (button.value) {
        operator = button.value;
    } else {
        operator = button;
    }
    

    // directly operate on %
    if (operator === "%") {
        operate(number, operator, number2);
    } else {
        number2 = [];
    }

}


function toggleNegative () {
    let currentNumber = (display.textContent === number.join("")) ? number : number2;

    currentNumber.includes("-") ? currentNumber.shift() : currentNumber.unshift("-");

    updateDisplay(currentNumber);
}


function getInputValue(value) {

    // Avoid input being added to number after user pressed equal
    if (equalButtonPushed) {
        clear();
    }

    let currentNumber = operator ? number2 : number;

    if (value === "." && currentNumber.includes(".")) {
        return;
    };

    currentNumber.push(value);
    updateDisplay(currentNumber);
}


function updateDisplay(arr) {
    display.textContent = arr.join("");
}


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


function operate(number, operator, number2) {

    number = parseFloat(number.join(""));
    number2 = parseFloat(number2.join(""));
    let result;


    if (operator === "+") {
        result = add(number, number2);
    } else if (operator === "-") {
        result = subtract(number, number2);
    } else if (operator === "/") {
        result = divide(number, number2);
    } else if (operator === "*") {
        result = multiply(number, number2);
    } else if (operator === "%") {
        result = percentage(number);
    }

    result = Math.round(result * 100000) / 100000;

    processResult(result);

    return result;
};


function processResult (result) {
    if (result != undefined) {
        number = result.toString().split("");
        number2 = [];
        updateDisplay(number);
    } else {
        updateDisplay(number);
    }
    
}


function clear() {
    number = [];
    operator = null;
    number2 = [];
    display.textContent = 0;
    equalButtonPushed = false;
}


