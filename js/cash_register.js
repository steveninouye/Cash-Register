var newDisplayNeeded = true;
var decimalInput = false;

var _total = {
    num: [],
    algorithm: [],
    total: "",
    memory: false
};

var _memory = [];

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

const addCalcHistory = function(x){
    _total.num.push(Number(display.value));
    _total.algorithm.push(x);
    getTotal();
    var cache = `${_total.total} ${_total.algorithm[_total.algorithm.length - 1]}`;
    var displayString = cache.replace(/[*]/g, 'X')
    var displayString = displayString.replace(/[\/]/g, '&divide;')
    document.getElementById('calcHistoryDisplay').innerHTML = displayString;
    document.getElementById('display').value = 0;
    newDisplayNeeded = true;
    decimalInput = false;
    if(x === "="){
        _memory.push(_total);
        _total = {
            num: [],
            algorithm: [],
            total: "",
            memory: false
        };
    }
}

function getTotal(equals){
    //resets total
    _total.total = "";
    //loops through all indexes of numbers and algorigthms except for last index
    for(var i = 0; i < _total.num.length - 1; i++){
        _total.total += `${_total.num[i]} ${_total.algorithm[i]} `;
    }
    //adds last index of num to total
    _total.total += `${_total.num[_total.num.length - 1]}`;
    document.getElementById('theTotal').innerHTML = eval(_total.total);
}
