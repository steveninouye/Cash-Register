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
    _total.num.push(Number(display.value).toFixed(2));
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
        document.getElementById('history').innerHTML += 
            _memory[_memory.length -1].total 
            + " = <br>" +
            eval(_memory[_memory.length -1].total).toFixed(2)
            + "<br>";
    }
}

function getTotal(){
    _total.total = "";
    for(var i = 0; i < _total.num.length - 1; i++){
        _total.total += `${_total.num[i]} ${_total.algorithm[i]} `;
    }
    _total.total += `${_total.num[_total.num.length - 1]}`;
    document.getElementById('theTotal').innerHTML = eval(_total.total).toFixed(2);
};

function adjustBalance(x){
    if(_total.num.length === 0){
        if(document.getElementById('display').value !== "0"){
             _memory.push(
                {
                    total: document.getElementById('display').value.toFixed(2),
                    memory: x
                }
            )
            document.getElementById('history').innerHTML +=
                _memory[_memory.length -1].total 
                + " <br>";
            document.getElementById('display').value = 0;
            newDisplayNeeded = true;
            decimalInput = false;
        } else if (document.getElementById('theTotal').innerText !== "" ){
            _memory[_memory.length - 1 ].memory = x;
        } else {
            console.log("you didn't withdraw or deposit anything");
        }
    } else {
        throw Error('Finish Your transaction!!!')
    }
}

function getBalance(){
    var balance = eval(_memory.reduce((acc, curr) => {
                if(curr.memory){
                    acc += `${curr.memory}\(${curr.total}\)`;
                }            
                return acc;
            }, "")
        );
    document.getElementById('calcHistoryDisplay').innerText = null;
    document.getElementById('theTotal').innerText = balance.toFixed(2);
}