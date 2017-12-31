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

var calcHistory = [[],[],[],[]];
var index = 0;

const addCalcHistory = function(x){
    calcHistory[0].push(Number(display.value));
    calcHistory[1].push(x);
    if(calc.add === x){
        calcHistory[2].push('+');
        calcHistory[3].push('+');
    } else if (calc.subtract === x) {
        calcHistory[2].push('-');
        calcHistory[3].push('-');
    } else if (calc.divide === x) {
        calcHistory[2].push('&divide;');
        calcHistory[3].push('/');
    } else if (calc.multiply === x) {
        calcHistory[2].push('X');
        calcHistory[3].push('*');
    }
    document.getElementById('calcHistoryDisplay').innerHTML += ` ${calcHistory[0][index]} ${calcHistory[2][index]}`;
    index++;
    display.value=0;
    newDisplayNeeded = true;
}

const equals = function(){
    let cache = "";
    for(var i = 0; i < calcHistory[0].length; i++){
        cache += calcHistory[0][i] + calcHistory[3][i];
    }
    cache += display.value;
    console.log(cache);
    display.value = eval(cache);
}