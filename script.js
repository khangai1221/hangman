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
  "cat",
  "dog",
  "sun",
  "car",
  "hat",
  "pen",
  "bat",
  "cup",
  "book",
  "fish",
  "milk",
  "star",
  "ball",
  "tree",
  "frog",
  "duck",
  "cake",
  "bird",
  "king",
  "rain",
];

const image = document.createElement("img");
image.src = "./hangman0.svg";
container.appendChild(image);

const blankWord = document.createElement("p");
blankWord.className = "title";
container.appendChild(blankWord);

const input = document.createElement("input");
input.type = "text";
input.placeholder = "Enter a letter";
input.className = "input";
input.maxLength = 1;
input.style.display = "none";
container.appendChild(input);

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
  startButton.textContent = "Start";
  input.disabled = false;
  input.value = "";
  input.style.display = "inline";

  selectedWord = gameWords[Math.floor(Math.random() * gameWords.length)];
  displayWord = Array(selectedWord.length).fill("_");
  blankWord.textContent = displayWord.join(" ");
  image.src = "./hangman0.svg";

  let timeLeft = totalTime;
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      input.disabled = true;
      input.style.display = "none";
      timerDisplay.textContent = "Time's up!";
      startButton.disabled = false;
      startButton.textContent = "Play Again";
    }
  }, 1000);
}

input.addEventListener("keyup", () => {
  const letter = input.value.toLowerCase();
  input.value = "";

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
      input.disabled = true;
      input.style.display = "none";
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
      input.disabled = true;
      input.style.display = "none";
      startButton.disabled = false;
      startButton.textContent = "Play Again";
    }
  }
});
