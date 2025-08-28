//get the display element (to show the input and output)
let display = document.getElementById("dis");

//variable to store all inputs of buttons
let buttons = document.querySelectorAll("button");

//Stores the current input from button
let currentInput = "";

//function to calculate the result
function SafeEval(expression) {
  try {
    expression = expression.replace(/×/g, "*").replace(/÷/g, "/");

    //checks the input allowance [^-> to start the string and $->to end the string, +->they are allowed multiple time]
    if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
      return "Error";
    }

    //makes a new function that calculate the expression
    //[()->adding at the end runs the function immediately]
    return new Function("return " + expression)(); 
  } catch (err) {
    return "Error"; //if calculation fails
  }
}

//using loop to access all buttons(stored in buttons varibale)
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    //get the text written inside the clicked button
    let values = buttons[i].innerText;

    if (values === "AC") {
      currentInput = "";
      display.value = "";
    } else if (values === "⌫") {
      currentInput = currentInput.slice(0, -1); //this will cut the last character from string[-1       represents character before last character]
      display.value = currentInput;
    }

    //call function to evalute operations
    else if (values === "=") {
      currentInput = SafeEval(currentInput).toString();
      display.value = currentInput;
    } else {
      currentInput += values;
      display.value = currentInput;
    }
  });
}
