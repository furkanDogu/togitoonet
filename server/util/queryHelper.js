const createEscapeStr = (amount) => {
    let escapedStr = '(';

    //expected input : 2
    //expected output: (?,?)
    //explanation: this method returns a string with the given number of question marks in brackets

    for (let i = 0; i < amount; i++) {
        // we shouldn't add comma to the last element
        if (i+1 !== amount) {
            escapedStr = escapedStr.concat('?,');
        } else {
            escapedStr = escapedStr.concat('?)');
        }
    }

    return escapedStr;
};

const convertIdToIntArray = (IDs) => {
    /* expected input : {
        "1": 23,
        "2": 34,
        "3": 67
    } */
    //expected output : [23, 34, 67]
    //explanation: this method returns an array of numbers which were given by parameter and was contained in an object
    let intArray = [];
    Object.keys(IDs).map(function(key) {
        intArray.push(parseInt(IDs[key]));
    });
    return intArray; 

};


const findAttrCount = (obj) => {
    var count = 0;
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
           ++count;
        }
    }
    return count;
}
module.exports = {
    createEscapeStr,
    convertIdToIntArray,
    findAttrCount
}