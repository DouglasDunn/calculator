// renders the top screen
function paintScreen(display) {

  $("#top").html(display);

}

// renders the bottom screen
function paintBottomScreen(bottomArray) {

  $("#bottom").html(bottomArray.join(""));

}

var calculatorArray = [];
var operatorArray = [];
var bottomArray = [];
var result = "";
var counter = 0;
var numberString = "";

// when a number gets clicked
$("#buttons").on("click", ".numbers", function(e) {

  var $number = $(e.target);

  // if last operar used was an equal, clear all variables and refresh the calculator.
  if (operatorArray[operatorArray.length - 1] === "=") {
    result = "";
    calculatorArray = [];
    operatorArray = [];

    if (bottomArray[bottomArray.length - 1] !== "0.") {
      bottomArray = [];
    }
    // numberString = "";
  }

  // if first character of numberString is not a number and equal to a decimal, clear the numberString.
  if (!Number(numberString[0]) && numberString[0] === ".") {
    numberString = "";
  }

  // concatenate the value onto numberString
  numberString += $number.val();

  // render the HTML with the number
  paintScreen(numberString);

  // push the number onto the bottomArray and render the bottom screen
  bottomArray.push($number.val());
  paintBottomScreen(bottomArray);

});

// when an operator gets clicked
$("#buttons").on("click", ".operators", function(e) {

  var $operator = $(e.target);

  // if last operator used was an equal sign and the operator that has just been pressed is not an equal sign, then push the operator onto the calculatorArray and operatorArray, render the HTML with the operator, push the operator onto the bottomArray, render the bottom screen, and then return.
  if (operatorArray[operatorArray.length - 1] === "=" && $operator.val() !== "=") {

    calculatorArray.push($operator.val());
    operatorArray.push($operator.val());
    paintScreen($operator.val());
    bottomArray.push($operator.val());
    paintBottomScreen(bottomArray);
    return;

  }

  // push the operator onto the array.
  operatorArray.push($operator.val());

  // if numberString is empty, return
  if (numberString === "") {
    return;
  }

  // push the number onto the array
  calculatorArray.push(numberString);

  // if operator is an equal sign, evaluate the equation, render the HTML with the result, make the result the only element in calculatorArray, clear the numberSting, push an equal sign and the result onto the bottom array and paint the bottom screen, then set the bottomArray to have the result as its only element.
  if ($operator.val() === "=") {

    result = eval(calculatorArray.join(""));
    paintScreen(result);
    calculatorArray = [result];
    numberString = "";
    bottomArray.push("=");
    bottomArray.push(result);
    paintBottomScreen(bottomArray);
    bottomArray = [result];
    return;

  }

  // overwrite numberString so that it just equals the operator
  numberString = $operator.val();

  // render the HTML with the operator
  paintScreen(numberString);

  // push the operator onto the array
  calculatorArray.push(numberString);

  // clear the numberString
  numberString = "";

  // push the the operator onto the bottomArray and render the bottom screen.
  bottomArray.push($operator.val());
  paintBottomScreen(bottomArray);

});

// when a decimal is clicked
$("#buttons").on("click", "#decimal", function(e) {

  $decimal = $(e.target);

  // if numberString already has a decimal in it, return
  if (numberString.indexOf(".") !== -1) {
    return;
  }

  // if the first character of numberString is not a number, clear the numberString
  if (!(Number(numberString[0]))) {
    numberString = "";
  }

  // if the numberString is empty, add 0. onto it
  if (numberString === "") {

    numberString += "0.";

    if (operatorArray[operatorArray.length - 1] === "=") {
      bottomArray = ["0."];
      paintBottomScreen(bottomArray);
    }

  // else just concatenate the decimal to the number
  } else {

    numberString += $decimal.val();
    bottomArray.push($decimal.val());
    paintBottomScreen(bottomArray);

  }

  //render the screen with the concatenated decimal
  paintScreen(numberString);
});

// if (value === "=" || value === "+" || value === "-" || value === "*" || value === "/") {
//   counter++;
// }
//
// if (value === "=") {
//   result = eval(calculatorArray.join(""));
//   paintScreen(result);
// }
// calculatorArray.push(value);
