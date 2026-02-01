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

/* RULES */
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

/* GAME */
window.playGame = function (userChoice) {
  const pcChoice = choices[Math.floor(Math.random() * choices.length)];

  if (triangle) triangle.style.display = "none";
  if (resultArea) resultArea.style.display = "block";

  if (userPick) {
    userPick.className = `circle ${userChoice}`;
    userPick.innerHTML = `<img src="assets/${userChoice}.png">`;
    userPick.classList.remove("winner");
  }

  if (pcPick) {
    pcPick.className = `circle ${pcChoice}`;
    pcPick.innerHTML = `<img src="assets/${pcChoice}.png">`;
  }

  if (nextBtn) nextBtn.style.display = "none";
  if (playAgainBtn) playAgainBtn.style.display = "block";

  if (userChoice === pcChoice) {
    if (resultText) resultText.innerText = "TIE UP";
    if (playAgainBtn) playAgainBtn.innerText = "REPLAY";
    return;
  }

  const userWins =
    (userChoice === "stone" && pcChoice === "scissor") ||
    (userChoice === "paper" && pcChoice === "stone") ||
    (userChoice === "scissor" && pcChoice === "paper");

  if (userWins) {
    if (resultText) resultText.innerText = "YOU WIN";
    userScore++;
    localStorage.setItem("userScore", userScore);
    if (userScoreEl) userScoreEl.innerText = userScore;
    if (userPick) userPick.classList.add("winner");
    if (nextBtn) nextBtn.style.display = "block";
  } else {
    if (resultText) resultText.innerText = "YOU LOST";
    pcScore++;
    localStorage.setItem("pcScore", pcScore);
    if (pcScoreEl) pcScoreEl.innerText = pcScore;
  }
};

/* RESET */
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
