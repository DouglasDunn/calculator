// var Operators = {
//   add: function(...args) {
//     var result = args[0];
//
//     for (var i = 1; i < args.length; i++) {
//       result += args[i];
//     }
//
//     return result;
//   },
//   subtract: function(...args) {
//     var result = args[0];
//
//     for (var i = 1; i < args.length; i++) {
//       result -= args[i];
//     }
//
//     return result;
//   },
//   multiply: function(...args) {
//     var result = args[0];
//
//     for (var i = 1; i < args.length; i++) {
//       result *= args[i];
//     }
//
//     return result;
//   },
//   divide: function(...args) {
//     var result = args[0];
//
//     for (var i = 1; i < args.length; i++) {
//       result /= args[i];
//     }
//
//     return result;
//   }
// };

var calculatorArray = [];
var monitoringArray = [];
var counter = 0;
var result = "";

$("#buttons").on("click", "button", function(e) {

  monitoringArray.push(e.target.value);
  console.log(monitoringArray, "monitoringArray");

  if (monitoringArray[monitoringArray.length - 2] === "=" && Number(monitoringArray[monitoringArray.length - 1])) {
    result = "";
    calculatorArray = [];
  }

  if (e.target.value === "+" || e.target.value === "-" ||e.target.value === "*" || e.target.value === "/" || e.target.value === "=") {
    counter++;

    if (counter === 2) {

      result = eval(calculatorArray.join(""));
      calculatorArray = [];
      calculatorArray.push(result);
      console.log(calculatorArray);
      counter = 0;

      if (e.target.value === "=") {
        console.log(calculatorArray, result);
        return;
      } else {
        counter++;
      }

    }

  }

  calculatorArray.push(e.target.value);
  console.log(calculatorArray, result);
});

// $("#buttons").on("click", "button", function(e) {
//   console.log(e.target.value);
//
//   if (e.target.value === "+" || e.target.value === "-" ||e.target.value === "*" || e.target.value === "/" || e.target.value === "=") {
//     counter++;
//
//     if (counter === 2) {
//       result = eval(result + calculatorArray.join(""));
//       console.log(result);
//     }
//   }
//
//   if (calculatorArray[calculatorArray.length - 1] === "=") {
//     if (e.target.value === "+" || e.target.value === "-" || e.target.value === "/" || e.target.value === "*") {
//       calculatorArray.pop();
//       console.log(calculatorArray);
//     } else {
//       calculatorArray = [];
//     }
//   }
//
//   if (e.target.value === "=") {
//     console.log(eval(calculatorArray.join("")));
//   }
//
//   calculatorArray.push(e.target.value);
// });
