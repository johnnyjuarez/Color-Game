var numberOfSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var correct = document.getElementById("correct");
var correctScore = 0;
var wrong = document.getElementById("wrong");
var wrongScore = 0;
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  // mode buttons event listeners
  setupModeButton();
  setupSquares();
  reset();
}

function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    // add initial colors to squares
    squares[i].style.backgroundColor = colors[i];
    // add click listeners to squares
    squares[i].addEventListener("click", function() {
      // grab color of clicked square
      var clickedColor = this.style.backgroundColor;
      // compare color to pickedColor
      if (clickedColor === pickedColor) {
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
        resetButton.textContent = "Play Again?";
        correctScore++;
        correct.textContent = "Correct: " + correctScore;
      } else {
        this.style.backgroundColor = "#232323";
        wrongScore++;
        wrong.textContent = "Wrong: " + wrongScore;
      }
    });
  }
}

function setupModeButton() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      modeButtons[2].classList.remove("selected");
      this.classList.add("selected");
      if (this.textContent === "Easy") {
        numberOfSquares = 3;
      } else if (this.textContent === "Normal") {
        numberOfSquares = 6;
      } else {
        numberOfSquares = 9;
      }
      // this.textContent === "Easy"
      //   ? (numberOfSquares = 3)
      //   : (numberOfSquares = 6);
      reset();
    });
  }
}

function reset() {
  // generate all new colors
  colors = generateRandomColors(numberOfSquares);
  // pick a new color from array
  pickedColor = pickColor();
  // change colorDisplay to match pickedColor
  colorDisplay.textContent = "Color Value: " + pickedColor;
  resetButton.textContent = "New Colors";

  // change colors of squares
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  // set h1 backgorund back to body background
  h1.style.backgroundColor = "#CCDDD3";
}

resetButton.addEventListener("click", function() {
  reset();
});

colorDisplay.textContent = "Color Value: " + pickedColor;

function changeColors(color) {
  // loop through all squares
  for (var i = 0; i < squares.length; i++) {
    // change each color to match given color
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  // make an array
  var arr = [];
  // repeat num times
  for (var i = 0; i < num; i++) {
    arr.push(randomColor());
    // get random color and push into arr
  }
  // return that array
  return arr;
}

function randomColor() {
  // pick a "red" from 0 - 255
  var r = Math.floor(Math.random() * 256);
  // pick a "green" from 0 - 255
  var g = Math.floor(Math.random() * 256);
  // pick a "blue" from 0 - 255
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
