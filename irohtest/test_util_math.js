

const Iroh = require("iroh");

let stage = new Iroh.Stage(`
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
operation(4,0,'divide')`)

//switch
stage.addListener(Iroh.SWITCH)
.on("enter", function(e) {
  // we enter the loop
  console.log(" ".repeat(e.indent) + "switch enter");
})
.on("leave", function(e) {
  // we leave the loop
  console.log(" ".repeat(e.indent) + "switch leave");
});
//case
stage.addListener(Iroh.CASE)
.on("enter", function(e) {
  // we enter the loop
  console.log(" ".repeat(e.indent) + "case enter");
})
.on("leave", function(e) {
  // we leave the loop
  console.log(" ".repeat(e.indent) + "case leave");
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

// create a listener
stage.addListener(Iroh.VAR)
.on("after", (e) => {
  // this logs the variable's 'name' and 'value'
  console.log(e.name, "=>", e.value); // prints "foo => 42"
});
//call recursive
stage.addListener(Iroh.FUNCTION)
.on("enter", (e) => {
  let sloppy = e.sloppy ? "#sloppy" : "";
  if (e.sloppy) {
    console.log(" ".repeat(e.indent) + "call", e.name, sloppy, "(", e.arguments, ")");
    console.log(e.getSource());
  }
})
.on("leave", (e) => {
  let sloppy = e.sloppy ? "#sloppy" : "";
  if (e.sloppy) {
    console.log(" ".repeat(e.indent) + "call", e.name, "end", sloppy, "->", [void 0]);
    console.log(e.getSource());
  }
})
.on("return", (e) => {
  let sloppy = e.sloppy ? "#sloppy" : "";
  if (e.sloppy) {
    console.log(" ".repeat(e.indent) + "call", e.name, "end", sloppy, "->", [e.return]);
    console.log(e.getSource());
  }
});
// program
stage.addListener(Iroh.PROGRAM)
.on("enter", (e) => {
  console.log(" ".repeat(e.indent) + "Program");
})
.on("leave", (e) => {
  console.log(" ".repeat(e.indent) + "Program end", "->", e.return);
});


eval(stage.script);