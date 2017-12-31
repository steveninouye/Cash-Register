const calc = calculatorModule();
var newDisplayNeeded = true;
var decimalInput = false;
const display = document.getElementById('display');

const displayValue = function(x){
    if(newDisplayNeeded && x === '00' | x === '000') {
        display.value = 0;
    } else if (newDisplayNeeded && x === '.'){
        newDisplayNeeded = false;
        decimalInput = true;
        display.value = '0.';
    } else if (newDisplayNeeded){
        newDisplayNeeded = false;
        display.value = x;
    } else if (!decimalInput && x === '.'){
        decimalInput = true
        display.value += x;
    } else if (!newDisplayNeeded && x !== '.') {
        display.value += x;
    } else {
        throw Error('Input a Number Dummy :-P');
    }
}

var calcHistory = [[],[]];

const addCalcHistory = function(x){
    calcHistory[0].push(Number(display.value));
    calcHistory[1].push(x);
    console.log(calcHistory);
}