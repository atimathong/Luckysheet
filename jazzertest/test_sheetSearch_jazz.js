const { FuzzedDataProvider } = require("@jazzer.js/core");

function luckysheetbinary_search(arr, key) {
    let low = 0, high = arr.length - 1;
    
    while (low <= high) {
        let mid = parseInt((high + low) / 2);
        
        if (key < arr[mid] && (mid == 0 || key >= arr[mid - 1])) {
            return mid;
        } 
        else if (key >= arr[mid]) {
            low = mid + 1;
        } 
        else if (key < arr[mid]) {
            high = mid - 1;
        }
        else {
            return -1;
        }
    }
}


/**
 * @param { Buffer } fuzzerInputData
 */
module.exports.fuzz = function (fuzzerInputData) {
	const data = new FuzzedDataProvider(fuzzerInputData);
	// const s1 = data.consumeString(data.consumeIntegralInRange(10, 15), "utf-8");
	const i1 = data.consumeIntegral(1);
	const i2 = data.consumeIntegral(2);
	const i3 = data.consumeIntegral(4);
    const i4 = data.consumeIntegral(3);
    const i5 = data.consumeIntegral(3);
    let j = data.consumeIntegral(3);
    console.log(i1,i2,i3,i4,i5)
    let result = luckysheetbinary_search([i1,i2,i3,i4,i5],j);

    if(isNaN(result)){
        console.log('result',result);
        // throw new Error("undefined output");
    }

	// if (i3 === 1000) {
	// 	if (s1 === "Hello World!") {
	// 		if (i1 === 3) {
	// 			if (i2 === 3) {
	// 				throw new Error("Crash!");
	// 			}
	// 		}
	// 	}
	// }
};