// renders the top screen
function paintScreen(display) {

  if (!display) {

    $("#top").html(0);

  } else if (overload) {

    $("#top").html("overload");

  } else {
    $("#top").html(display);
  }

}

// renders the bottom screen
function paintBottomScreen(bottomArray) {
  if (!bottomArray) {

    $("#bottom").html(0);

  } else if (bottomArray.join("").length > 19) {
    $("#bottom").html("overload");
    overload = true;

  } else {

    $("#bottom").html(bottomArray.join(""));

  }

}

var calculatorArray = [];
var operatorArray = [];
var bottomArray = [];
var result = "";
var counter = 0;
var numberString = "";
var overload = false;

// when a number gets clicked
$("#buttons").on("click", ".numbers", function(e) {

  var $number = $(e.target);

  if (overload) {
    return;
  }

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

  // push the number onto the bottomArray and render the bottom screen
  bottomArray.push($number.val());
  paintBottomScreen(bottomArray);

  // render the HTML with the number
  paintScreen(numberString);


});

// when an operator gets clicked
$("#buttons").on("click", ".operators", function(e) {

  var $operator = $(e.target);

  if (overload) {
    return;
  }

  // if last operator used was an equal sign and the operator that has just been pressed is not an equal sign, then push the operator onto the calculatorArray and operatorArray, render the HTML with the operator, push the operator onto the bottomArray, render the bottom screen, and then return.
  if (operatorArray[operatorArray.length - 1] === "=" && $operator.val() !== "=") {

    calculatorArray.push($operator.val());
    operatorArray.push($operator.val());
    bottomArray.push($operator.val());
    paintBottomScreen(bottomArray);
    paintScreen($operator.val());
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
    bottomArray.push("=");
    bottomArray.push(result);
    paintBottomScreen(bottomArray);//***************
    paintScreen(result);
    calculatorArray = [result];
    numberString = "";
    // bottomArray.push("=");
    // bottomArray.push(result);
    // paintBottomScreen(bottomArray);*****************
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

  var $decimal = $(e.target);

  if (overload) {
    return;
  }

  // if numberString already has a decimal in it, return
  if (numberString.indexOf(".") !== -1) {
    return;
  }

  // if the first character of numberString is not a number, clear the numberString
  if (!(Number(parseFloat(numberString[0]))) && parseFloat(numberString[0]) !== 0) {
    numberString = "";
  }

  // if the numberString is empty, add 0. onto it
  if (numberString === "") {

    numberString += "0.";

    if (operatorArray[operatorArray.length - 1] === "=") {

      bottomArray = [numberString];

    } else {

      bottomArray.push(numberString);

    }

    paintBottomScreen(bottomArray);
  // else just concatenate the decimal to the number
  } else {

    numberString += $decimal.val();
    bottomArray.push($decimal.val());
    // paintBottomScreen(bottomArray);

  }

  //render the screen with the concatenated decimal
  paintBottomScreen(bottomArray);
  paintScreen(numberString);
});

$("#buttons").on("click", ".clear", function(e) {

  var $clear = $(e.target);

  if ($clear.val() === "AC") {

    calculatorArray = [];
    operatorArray = [];
    bottomArray = [];
    result = "";
    counter = 0;
    numberString = "";
    overload = false;

    paintBottomScreen();
    paintScreen();

  }
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
