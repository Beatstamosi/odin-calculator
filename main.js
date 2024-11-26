let number = [];
let operator = null;
let number2 = [];
let display = document.querySelector(".display");


// assign eventlistener to number buttons
Array.from(document.querySelectorAll(".number")).forEach(button => {
    button.addEventListener("click", () => {
        getInputValue(button);
    });
})

// assign eventlistener to operator buttons
    // assign operator value
    // solve equation if 
Array.from(document.querySelectorAll(".operator")).forEach(button => {
    button.addEventListener("click", () => {

        if (number2.length > 0) {
            operate(number, operator, number2);
        }

        operator = button.value;

        // directly operate on %
        if (operator === "%") {
            operate(number, operator, number2);
        } else {
            number2 = [];
        }

        // assign action to +/- button
 
    });
})



// assign eventlistener to equal button
document.querySelector("#equal").addEventListener("click", () => {
    operate(number, operator, number2);
})


// assign eventlistener to "." button


// set up clear button
document.querySelector("#clear").addEventListener("click", () => {
    number = [];
    operator = null;
    number2 = [];
    display.textContent = 0;
})



function getInputValue(button) {
    let value = button.value;

    if (!operator) {
        number.push(value);
        updateDisplay(number);
    } else if (operator != null) {
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
    return number / number2;
}


function percentage (number) {
    return number / 100;
}


function operate(number, operator, number2) {
    
    // add . compatibility

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


    number = result.toString().split("");
    number2 = [];
    updateDisplay(number);
};




