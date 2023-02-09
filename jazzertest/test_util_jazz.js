const { FuzzedDataProvider } = require("@jazzer.js/core");


function createABCdim(x) {
    const columeHeader_word = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    columeHeader_word_index = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9, 'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25 },
    flow = '<div id="luckysheet-cell-flow_${index}" class="luckysheet-cell-flow luckysheetsheetchange" style="width:${width}px;"><div class="luckysheet-cell-flow-clip"><div class="luckysheet-grdblkpush"></div>${flow}</div></div>',
    colsmenuHTML = '';
    let chwl = columeHeader_word.length;

    if (x == 1) {
        let ret = [];
        let c = 0, con = true;

        for (let i = 0; i < chwl; i++) {
            let b = columeHeader_word[i];

            for (let n = 0; n < chwl; n++) {
                let bq = b + columeHeader_word[n];
                ret.push(bq);
                c++;

                if (c > index) {
                    return ret;
                }
            }
        }
    }
    else if (x == 2) {
        let ret = [];
        let c = 0, con = true;

        for (let i = 0; i < chwl; i++) {
            let bb = columeHeader_word[i];

            for (let w = 0; w < chwl; w++) {
                let aa = columeHeader_word[w];

                for (let n = 0; n < chwl; n++) {
                    let bqa = bb + aa + columeHeader_word[n];
                    ret.push(bqa);
                    c++;

                    if (c > index) {
                        return ret;
                    }
                }
            }
        }
    }
};

/**
 * @param { Buffer } fuzzerInputData
 */
module.exports.fuzz = function (fuzzerInputData) {
	const data = new FuzzedDataProvider(fuzzerInputData);
	// const s1 = data.consumeString(data.consumeIntegralInRange(10, 15), "utf-8");
	const i1 = data.consumeIntegral(3);

    console.log(i1)
    let result = createABCdim(i1);
    console.log('result',result);
    // if(isNaN(result)){
        
    //     // throw new Error("undefined output");
    // }

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