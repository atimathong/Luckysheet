// sheetSearch.js
const Iroh = require("iroh");

let stage = new Iroh.Stage(`
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
luckysheetbinary_search([2,14,21,35,45,100,113,130,290],500000);
`);
//// iroh test1
// while, for etc.
stage.addListener(Iroh.LOOP)
.on("enter", function(e) {
  // we enter the loop
  console.log(" ".repeat(e.indent) + "loop enter");
})
.on("leave", function(e) {
  // we leave the loop
  console.log(" ".repeat(e.indent) + "loop leave");
});

// if, else if
stage.addListener(Iroh.IF)
.on("enter", function(e) {
  // we enter the if
  console.log(" ".repeat(e.indent) + "if enter");
})
.on("leave", function(e) {
  // we leave the if
  console.log(" ".repeat(e.indent) + "if leave");
});
//else
stage.addListener(Iroh.ELSE)
.on("enter", function(e) {
  // we enter the else
  console.log(" ".repeat(e.indent) + "else enter");
})
.on("leave", function(e) {
  // we leave the else
  console.log(" ".repeat(e.indent) + "else leave");
});

// program
stage.addListener(Iroh.PROGRAM)
.on("enter", (e) => {
  console.log(" ".repeat(e.indent) + "Program Start");
})
.on("leave", (e) => {
  console.log(" ".repeat(e.indent) + "Program End", "->", e.return);
});
eval(stage.script);
// end test1




// let stage2 = new Iroh.Stage(`function luckysheetorder_search(arr, y) {
//     let i = 0, 
//         row = 0, 
//         row_pre = 0, 
//         row_index = -1, 
//         i_ed = arr.length - 1;

//     while (i < arr.length && i_ed >= 0 && i_ed >= i) {
//         row = arr[i_ed];

//         if (i_ed == 0) {
//             row_pre = 0;
//         }
//         else {
//             row_pre = arr[i_ed - 1];
//         }

//         if (y >= row_pre && y < row) {
//             row_index = i_ed;
//             break;
//         }

//         row = arr[i];

//         if (i == 0) {
//             row_pre = 0;
//         }
//         else {
//             row_pre = arr[i - 1];
//         }

//         if (y >= row_pre && y < row) {
//             row_index = i;
//             break;
//         }

//         i++;
//         i_ed--;
//     }

//     return row_index;
// }
// luckysheetorder_search([2,14,21,35,100,21,22,11,55],500);`)

// //// iroh test2
// // while, for etc.
// stage2.addListener(Iroh.LOOP)
// .on("enter", function(e) {
//   // we enter the loop
//   console.log(" ".repeat(e.indent) + "loop enter");
// })
// .on("leave", function(e) {
//   // we leave the loop
//   console.log(" ".repeat(e.indent) + "loop leave");
// });

// // if, else if
// stage2.addListener(Iroh.IF)
// .on("enter", function(e) {
//   // we enter the if
//   console.log(" ".repeat(e.indent) + "if enter");
// })
// .on("leave", function(e) {
//   // we leave the if
//   console.log(" ".repeat(e.indent) + "if leave");
// });
// //else
// stage2.addListener(Iroh.ELSE)
// .on("enter", function(e) {
//   // we enter the else
//   console.log(" ".repeat(e.indent) + "else enter");
// })
// .on("leave", function(e) {
//   // we leave the else
//   console.log(" ".repeat(e.indent) + "else leave");
// });

// // create a listener
// stage2.addListener(Iroh.VAR)
// .on("after", (e) => {
//   // this logs the variable's 'name' and 'value'
//   console.log(e.name, "=>", e.value); // prints "foo => 42"
// });

// // program
// stage2.addListener(Iroh.PROGRAM)
// .on("enter", (e) => {
//   console.log(" ".repeat(e.indent) + "Program");
// })
// .on("leave", (e) => {
//   console.log(" ".repeat(e.indent) + "Program end", "->", e.return);
// });
// eval(stage2.script);


// end test2

