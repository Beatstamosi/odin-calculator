let number = [];
let operator = null;
let number2 = [];
let display = document.querySelector(".display");
let equalButtonPushed = false;


// set up number buttons
Array.from(document.querySelectorAll(".number")).forEach(button => {
    button.addEventListener("click", () => {
        getInputValue(button);
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
    console.log(number);
})

// set up toggle-negative button
document.querySelector(".toggle-negative").addEventListener("click", toggleNegative);


// set up clear button
document.querySelector("#clear").addEventListener("click", clear);


// set up "." button



function operatorAction (button) {

    // allow to continue math operations after pressing equal
    if (equalButtonPushed) {
        equalButtonPushed = false;
    }

    if (number2.length > 0) {
        result = operate(number, operator, number2);
        processResult(result);
    }

    operator = button.value;

    // directly operate on %
    if (operator === "%") {
        operate(number, operator, number2);
    } else {
        number2 = [];
    }

}


function toggleNegative () {
    let numberToChange = display.textContent.split("");

    if (number.join() === numberToChange.join()) {
        number.includes("-") ? number.shift() : number.unshift("-");
        updateDisplay(number);
    } else {
        number2.includes("-") ? number2.shift() : number2.unshift("-");
        updateDisplay(number2);
    }
}


function getInputValue(button) {
    let value = button.value;

    // avoid input being added to number after user pressed equal
    if (equalButtonPushed) {
        clear();
    }

    if (!operator) {
        number.push(value);
        updateDisplay(number);
    } else if (operator) {
        number2.push(value);
        updateDisplay(number2);
    }
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
    return Math.round((number / number2) * 100) / 100
}


function percentage (number) {
    return number / 100;
}


function operate(number, operator, number2) {
    
    // add . compatibility via parseFloat

    number = parseInt(number.join(""));
    number2 = parseInt(number2.join(""));
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

    processResult(result);

    return result;
};


function processResult (result) {
    if (result) {
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


