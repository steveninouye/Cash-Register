function cashRegister(){
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
        _total.num.push(parseFloat(display.value).toFixed(2));
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
                "<span>" + _memory[_memory.length -1].total + "</span>= <br> <span>" +
                eval(_memory[_memory.length -1].total).toFixed(2)
                + "</span><br>";
        }
    }

    function getTotal(){
        _total.total = "";
        for(var i = 0; i < _total.num.length - 1; i++){
            _total.total += `${_total.num[i]} ${_total.algorithm[i]} `;
        }
        _total.total += `${_total.num[_total.num.length - 1]}`;
        document.getElementById('theTotal').innerHTML = "<span>" + eval(_total.total).toFixed(2) + "</span>";
    };

    function adjustBalance(x){
        if(_total.num.length === 0){
            if(document.getElementById('display').value !== "0"){
                _memory.push(
                    {
                        total: parseFloat(document.getElementById('display').value).toFixed(2),
                        memory: x
                    }
                )
                document.getElementById('history').innerHTML += "<span>" +
                    _memory[_memory.length -1].total + "</span><br>";
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
        let s = document.querySelectorAll('span');
        if(x === "+"){
            s[s.length-1].className = 'green';
        } else if (x === "-"){
            s[s.length-1].className = 'red';
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
        document.getElementById('theTotal').innerHTML = "<span class='theBigOne'>" + balance.toFixed(2) + "</span>";
    }

    function clr(){
        _total = {
            num: [],
            algorithm: [],
            total: "",
            memory: false
        };
        newDisplayNeeded = true;
        decimalInput = false;
        document.getElementById('display').value = 0;
        document.getElementById('theTotal').innerText = null;
        document.getElementById('calcHistoryDisplay').innerHTML = null;
    }

    return {
        clr: clr,
        getBalance: getBalance,
        adjustBalance: adjustBalance,
        addCalcHistory: addCalcHistory,
        displayValue: displayValue
    }
}

var e = cashRegister();