function calculatorModule (){
    var _total = 0;
    var _memory = 0;

    function load(x){
        validate(x);
        _total = x;
        return x;
    }

    function getTotal(){
        return _total;
    }

    function add(x){
        validate(x);
        _total += x;
        return _total;
    }

    function subtract(x){
        validate(x);
        _total -= x;
        return _total;
    }

    function multiply(x){
        validate(x);
        _total *= x;
        return _total;
    }

    function divide(x){
        validate(x);
        _total /= x;
        return _total;
    }

    function recallMemory(){
        return _memory;
    }

    function saveMemory(){
        _memory = _total;
    }

    function clearMemory(){
        _memory = 0;
    }

    function validate(x){
        if(typeof x !== 'number'){
            throw Error('Invalid input');
        }
    }

   return {
       load: load,
       getTotal: getTotal,
       add: add,
       subtract: subtract,
       multiply: multiply,
       divide: divide,
       recallMemory: recallMemory,
       saveMemory: saveMemory,
       clearMemory: clearMemory
   };
}