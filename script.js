  const choices = ["stone", "paper", "scissor"];

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

// init
if (userScoreEl) userScoreEl.innerText = userScore;
if (pcScoreEl) pcScoreEl.innerText = pcScore;
if (triangle) triangle.style.display = "flex";
if (resultArea) resultArea.style.display = "none";
if (winnerScreen) winnerScreen.style.display = "none";
if (nextBtn) nextBtn.style.display = "none";

 
const rulesBox = document.createElement("div");
rulesBox.className = "rulesBox";
rulesBox.innerHTML = `
  <button class="rulesCloseBtn">✕</button>
  <img src="assets/rule.png" width="220">
`;
document.body.appendChild(rulesBox);

if (rulesBtn) {
  rulesBtn.onclick = () => rulesBox.classList.add("show");
}

rulesBox.querySelector(".rulesCloseBtn").onclick = () =>
  rulesBox.classList.remove("show");

//game
 window.playGame = function (userChoice) {
  const pcChoice = choices[Math.floor(Math.random() * choices.length)];

  triangle.style.display = "none";
  resultArea.style.display = "block";

  userPick.className = `circle ${userChoice}`;
  pcPick.className = `circle ${pcChoice}`;
  userPick.classList.remove("winner");

  userPick.innerHTML = `<img src="assets/${userChoice}.png">`;
  pcPick.innerHTML = `<img src="assets/${pcChoice}.png">`;

  playAgainBtn.style.display = "block";
  nextBtn.style.display = "none";

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

  // WIN
  if (userWins) {
    resultText.innerText = "YOU WIN";

    userScore++;
    userScoreEl.innerText = userScore;
    localStorage.setItem("userScore", userScore);

    userPick.classList.add("winner");
    playAgainBtn.innerText = "PLAY AGAIN";
    nextBtn.style.display = "block";  
  }
  // LOSE
  else {
    resultText.innerText = "YOU LOST";

    pcScore++;
    pcScoreEl.innerText = pcScore;
    localStorage.setItem("pcScore", pcScore);

    playAgainBtn.innerText = "PLAY AGAIN";
  }
};
 
function resetGameUI() {
  if (winnerScreen) winnerScreen.style.display = "none";
  if (resultArea) resultArea.style.display = "none";
  if (triangle) triangle.style.display = "flex";
  if (userPick) userPick.classList.remove("winner");
  if (nextBtn) nextBtn.style.display = "none";
}

if (playAgainBtn) playAgainBtn.onclick = resetGameUI;
if (winnerPlayAgain) winnerPlayAgain.onclick = resetGameUI;

if (nextBtn) {
  nextBtn.onclick = () => {
    if (resultArea) resultArea.style.display = "none";
    if (winnerScreen) winnerScreen.style.display = "flex";
    nextBtn.style.display = "none";
  };
}
