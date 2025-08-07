const container = document.querySelector(".container");

const title = document.createElement("h1");
title.className = "title";
title.textContent = "Hangman";
container.appendChild(title);

const timerDisplay = document.createElement("div");
timerDisplay.id = "timerDisplay";
timerDisplay.className = "timer";
container.appendChild(timerDisplay);
const gameWords = [
  "cat", "dog", "fish", "bird", "cow", "pig", "lion", "tiger", "bear", "horse",
  "apple", "banana", "grape", "orange", "peach", "cherry", "lemon", "mango",
  "car", "bus", "train", "plane", "boat", "truck", "bike",
  "hat", "shoe", "sock", "shirt", "pants", "coat", "scarf",
  "red", "blue", "green", "yellow", "pink", "black", "white",
  "sun", "moon", "star", "cloud", "rain", "snow", "wind",
  "ball", "game", "doll", "lego", "toy", "book", "pen", "bag"
];


const image = document.createElement("img");
image.src = "./hangman0.svg";
container.appendChild(image);

const blankWord = document.createElement("p");
blankWord.className = "title";
container.appendChild(blankWord);

const keyboard = document.createElement("div");
keyboard.className = "keyboard";
container.appendChild(keyboard);

const startButton = document.createElement("button");
startButton.textContent = "Start";
startButton.className = "startButton";
container.appendChild(startButton);

let selectedWord = "";
let displayWord = [];
let wrongClick = 0;
let timerInterval;
const totalTime = 30;

startButton.onclick = startGame;

function startGame() {
  clearInterval(timerInterval);
  wrongClick = 0;
  startButton.disabled = true;
  selectedWord = gameWords[Math.floor(Math.random() * gameWords.length)];
  displayWord = Array(selectedWord.length).fill("_");
  blankWord.textContent = displayWord.join(" ");
  image.src = "./hangman0.svg";

  createKeyboard();

  let timeLeft = totalTime;
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      disableKeyboard();
      timerDisplay.textContent = "Time's up!";
      blankWord.textContent = selectedWord.split("").join(" ");
      startButton.disabled = false;
      startButton.textContent = "Play Again";
    }
  }, 1000);
}

function createKeyboard() {
  const rows = [
    "QWERTYUIOP".split(""),
    "ASDFGHJKL".split(""),
    "ZXCVBNM".split(""),
  ];

  keyboard.innerHTML = "";

  rows.forEach((row) => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "keyboard-row";

    row.forEach((key) => {
      const button = document.createElement("button");
      button.textContent = key;
      button.className = "key";
      button.onclick = () => handleGuess(key.toLowerCase());
      rowDiv.appendChild(button);
    });

    keyboard.appendChild(rowDiv);
  });
}

function handleGuess(letter) {
  const buttons = document.querySelectorAll(".key");
  buttons.forEach((btn) => {
    if (btn.textContent.toLowerCase() === letter) {
      btn.disabled = true;
    }
  });

  if (selectedWord.includes(letter)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === letter && displayWord[i] === "_") {
        displayWord[i] = letter;
      }
    }

    blankWord.textContent = displayWord.join(" ");

    if (!displayWord.includes("_")) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "You win!";
      disableKeyboard();
      startButton.disabled = false;
      startButton.textContent = "Play Again";
    }
  } else {
    wrongClick++;
    if (wrongClick <= 6) {
      image.src = `./hangman${wrongClick}.svg`;
    }

    if (wrongClick === 6) {
      clearInterval(timerInterval);
      blankWord.textContent = selectedWord.split("").join(" ");
      timerDisplay.textContent = "Game Over!";
      disableKeyboard();
      startButton.disabled = false;
      startButton.textContent = "Play Again";
    }
  }
}

function disableKeyboard() {
  const buttons = document.querySelectorAll(".key");
  buttons.forEach((btn) => (btn.disabled = true));
}
