//TOP's Calculator Project
const numpad = document.getElementsByClassName("numpadButton");
const operatorpad = document.getElementsByClassName("operation");
const solve = document.getElementById("equal");
const backspace = document.getElementById("backspace");
const clearDisplay = document.getElementById("clearDisplay");
const clearAll = document.getElementById("clearAll");
const negative = document.getElementById("negative");

let disp = document.getElementById("display");
let dispCounter = 0;

let operatorTemp;
let secondNumTemp = "";


let myObj = {
    firstNum: "",
    secondNum: "",
    operator: "",
    answerIter: "",
};

let myNegCounter = {
    firstNum: "0",
    secondNum: "0",
    answerIter: "0",
};

for (let myFirstNum of numpad) {
    myFirstNum.addEventListener("click", numSelection);
}

for (let operator of operatorpad) {
    operator.addEventListener("click", operatorSelection);
}

backspace.addEventListener("click", delBackspace);
clearDisplay.addEventListener("click", delClearDisplay);
clearAll.addEventListener("click", delClearAll);
solve.addEventListener("click", operate);
negative.addEventListener("click", negativeSign);

//FUNCTIONS
function numSelection(e) {
    if (disp.textContent.length >= 30) return;
    const digit = e.target.textContent;
    disp.classList.remove("answer");
    myObj.answerIter = "";

    if (dispCounter === 0) {
        if (+digit === 0) return;
        if (digit === '.') decimal(digit);
        else {
            disp.textContent = digit;
            dispCounter = 1;
            myObj.firstNum += digit;
        }
    } else if (dispCounter === 1) {
            if (checkDecimal(myObj.firstNum+e.target.textContent, dispCounter) === 0) return;
            disp.textContent += digit;
            myObj.firstNum += digit;
    } else if (dispCounter === 2) {
            if (checkDecimal(myObj.secondNum+e.target.textContent, dispCounter) === 0) return;
            disp.textContent += digit;
            myObj.secondNum += digit;
            if (myObj.secondNum[0] === ".") {
                disp.textContent = disp.textContent.slice(0, disp.textContent.length-1) + "0.";
                myObj.secondNum = "0.";
            }
    } else if (dispCounter === 3) {
            disp.textContent = digit;
            myObj.firstNum = digit;
            dispCounter = 1;
    }
}

//functions to manipulate decimals
function decimal(dig) {
    disp.textContent = "0"+dig;
    dispCounter = 1;
    myObj.firstNum += dig;
}

function checkDecimal(num) {
    if (num.split(".").length-1 > 1) return 0;
}

//operator
function operatorSelection(e) {
    const op = e.target.textContent;
    
    if (myObj.secondNum) {
        disp.textContent = disp.textContent.slice(0, disp.textContent.length - myObj.secondNum.toString().length - 1) + op + myObj.secondNum;
    } else if (myObj.operator) {
        disp.textContent = disp.textContent.slice(0, disp.textContent.length-1);
        disp.textContent += op;
    } else {
        disp.textContent += op;
    }

    if (myObj.answerIter || myObj.answerIter === 0) {
        disp.classList.remove("answer");
        disp.textContent = myObj.answerIter + op;
        myObj.firstNum = myObj.answerIter;
    }

    myObj.operator = op;
    dispCounter = 2;
}

//negative
function negativeSign(e) {
    if (myObj.secondNum) {
        myObj.secondNum = +myObj.secondNum*-1;
        disp.textContent = myObj.firstNum + myObj.operator + myObj.secondNum;
    } else if (myObj.operator) {
        return;
    } else if (myObj.firstNum) {
        myObj.firstNum = +myObj.firstNum*-1;
        disp.textContent = myObj.firstNum;
    } else if (myObj.answerIter) {
        myObj.answerIter = +myObj.answerIter*-1;
        disp.textContent = myObj.answerIter;
    }
}


//Solve
function operate(e) {
    if (myObj.operator && myObj.secondNum === "") {
        alert("Please enter a second number");
        return;
    }
    if (myObj.secondNum) {
        switch (myObj.operator) {
            case "+":
                disp.textContent = Math.round(add(myObj.firstNum, myObj.secondNum)*1000)/1000;
                break;
            case "-":
                disp.textContent = Math.round(subtract(myObj.firstNum, myObj.secondNum)*1000)/1000;
                break;
            case "*":
                disp.textContent = Math.round(multiply(myObj.firstNum, myObj.secondNum)*1000)/1000;
                break;
            case "/":
                if (+myObj.secondNum === 0) {
                    delClearAll();
                    disp.textContent = "YA BROKE IT";
                    disp.classList.add("answer");
                    dispCounter = 0;
                    return;
                } else disp.textContent = Math.round(divide(myObj.firstNum, myObj.secondNum)*1000)/1000;
                break;
            default:
                alert("huh?");
                break;
        }
    } 
    disp.classList.add("answer");
    myObj.answerIter = disp.textContent;
    clearObj();
    dispCounter = 3;
}

//Mathematical formulas
function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return +a - +b;
}

function multiply(a, b) {
    return +a * +b;
}

function divide(a, b) {
    return +a / +b;
}

//delete display functions
function delBackspace() {
    disp.textContent = disp.textContent.slice(0, disp.textContent.length-1);
    if (myObj.secondNum) {
        myObj.secondNum = myObj.secondNum.slice(0, myObj.secondNum.length-1);
    } else if (myObj.operator && myObj.secondNum === "") {
        myObj.operator = "";
    } else if (myObj.firstNum) {
        myObj.firstNum = myObj.firstNum.slice(0, myObj.firstNum.length-1);
    } else {
        myObj.answerIter = myObj.answerIter.slice(0,myObj.answerIter.length-1);
        if (myObj.answerIter === "") {
            myObj.answerIter = 0;
            disp.textContent = "0";
        }
    }
}

function delClearDisplay() {
    disp.textContent = "";
    clearObj();
}

function delClearAll() {
    disp.classList.remove("answer");
    disp.textContent = "enter...";
    clearObj();
    myObj.answerIter = "";
    dispCounter = 0;
}

function clearObj() {
    myObj.firstNum = "";
    myObj.secondNum = "";
    myObj.operator = "";
}