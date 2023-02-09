/* eslint-disable no-unused-vars */

const { FuzzedDataProvider } = require("@jazzer.js/core");


function isInteger(obj) {
    return Math.floor(obj) === obj;
}
function toInteger(floatNum) {
    var ret = { times: 1, num: 0 };

    if (isInteger(floatNum)) {
        ret.num = floatNum;
        return ret;
    }

    var strfi = floatNum + '';
    var dotPos = strfi.indexOf('.');
    var len = strfi.substr(dotPos + 1).length;
    var times = Math.pow(10, len);
    var intNum = parseInt(floatNum * times + 0.5, 10);

    ret.times = times;
    ret.num = intNum;

    return ret;
}
function operation(a, b, op) {
    var o1 = toInteger(a);
    var o2 = toInteger(b);
    var n1 = o1.num;
    var n2 = o2.num;
    var t1 = o1.times;
    var t2 = o2.times;
    var max = t1 > t2 ? t1 : t2;
    var result = null;

    switch (op) {
        case 'add':
            if (t1 === t2) { // 两个小数位数相同
                result = n1 + n2;
            }
            else if (t1 > t2) { // o1 小数位 大于 o2
                result = n1 + n2 * (t1 / t2);
            }
            else { // o1 小数位 小于 o2
                result = n1 * (t2 / t1) + n2;
            }

            return result / max;
        case 'subtract':
            if (t1 === t2) {
                result = n1 - n2;
            }
            else if (t1 > t2) {
                result = n1 - n2 * (t1 / t2);
            }
            else {
                result = n1 * (t2 / t1) - n2;
            }

            return result / max;
        case 'multiply':
            result = (n1 * n2) / (t1 * t2);

            return result;
        case 'divide':
            return result = function () {
                var r1 = n1 / n2;
                var r2 = t2 / t1;
                return operation(r1, r2, 'multiply');
            }();
    }
}

/**
 * @param { Buffer } fuzzerInputData
 */
module.exports.fuzz = function (fuzzerInputData) {
	const data = new FuzzedDataProvider(fuzzerInputData);
	const s1 = data.consumeString(data.consumeIntegralInRange(10, 15), "utf-8");
	const i1 = data.consumeIntegral(1);
	const i2 = data.consumeIntegral(2);

    // console.log(s1,i1,i2)
    let result = operation(i1,i2,s1);

    // if(isNaN(result)){
    //     console.log('result',result);
    //     // throw new Error("undefined output");
    // }

};