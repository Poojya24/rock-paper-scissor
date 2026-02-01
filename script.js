 const choices = ["stone", "paper", "scissor"];

// scores
let userScore = Number(localStorage.getItem("userScore")) || 0;
let pcScore = Number(localStorage.getItem("pcScore")) || 0;

// elements
const triangle = document.querySelector(".triangleWrapper");
const resultArea = document.querySelector(".resultArea");
const userPick = document.getElementById("userPick");
const pcPick = document.getElementById("pcPick");
const resultText = document.getElementById("resultText");
const playAgainBtn = document.getElementById("playAgainBtn");
const nextBtn = document.getElementById("nextBtn");
const userScoreEl = document.getElementById("userScore");
const pcScoreEl = document.getElementById("pcScore");
const winnerScreen = document.getElementById("winnerScreen");
const winnerPlayAgain = document.getElementById("winnerPlayAgain");
const rulesBtn = document.querySelector(".rules");

 
userScoreEl.innerText = userScore;
pcScoreEl.innerText = pcScore;

triangle.style.display = "flex";
resultArea.style.display = "none";
winnerScreen.style.display = "none";
nextBtn.style.display = "none";
 
const rulesBox = document.createElement("div");
rulesBox.className = "rulesBox";
rulesBox.innerHTML = `
  <button class="rulesCloseBtn">✕</button>
  <img src="assets/rule.png" width="220" alt="Rules">
`;
document.body.appendChild(rulesBox);

rulesBtn.onclick = () => {
  rulesBox.classList.add("show");
};

rulesBox.querySelector(".rulesCloseBtn").onclick = () => {
  rulesBox.classList.remove("show");
};

//game
window.playGame = function (userChoice) {
  const pcChoice = choices[Math.floor(Math.random() * choices.length)];

  // reset
  nextBtn.style.display = "none";
  userPick.classList.remove("winner");

  triangle.style.display = "none";
  resultArea.style.display = "block";

  userPick.className = `circle ${userChoice}`;
  pcPick.className = `circle ${pcChoice}`;

  userPick.innerHTML = `<img src="assets/${userChoice}.png">`;
  pcPick.innerHTML = `<img src="assets/${pcChoice}.png">`;

  // TIE
  if (userChoice === pcChoice) {
    resultText.innerText = "TIE UP";
    playAgainBtn.innerText = "REPLAY";
    return;
  }

  const userWins =
    (userChoice === "stone" && pcChoice === "scissor") ||
    (userChoice === "paper" && pcChoice === "stone") ||
    (userChoice === "scissor" && pcChoice === "paper");

  if (userWins) {
    resultText.innerText = "YOU WIN";

    userScore++;
    userScoreEl.innerText = userScore;
    localStorage.setItem("userScore", userScore);

    userPick.classList.add("winner");
    playAgainBtn.innerText = "PLAY AGAIN";
    nextBtn.style.display = "block"; 
    resultText.innerText = "YOU LOST";

    pcScore++;
    pcScoreEl.innerText = pcScore;
    localStorage.setItem("pcScore", pcScore);

    playAgainBtn.innerText = "PLAY AGAIN";
  }
};

 
function resetGameUI() {
  winnerScreen.style.display = "none";
  resultArea.style.display = "none";
  triangle.style.display = "flex";

  userPick.classList.remove("winner");
  nextBtn.style.display = "none";
  rulesBox.classList.remove("show");
}

playAgainBtn.onclick = resetGameUI;
winnerPlayAgain.onclick = resetGameUI;

 
nextBtn.onclick = () => {
  resultArea.style.display = "none";
  winnerScreen.style.display = "flex";
  nextBtn.style.display = "none";
  rulesBox.classList.remove("show");
};
