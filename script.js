  
  
const choices = ["stone", "paper", "scissor"];
   let userScore = localStorage.getItem("userScore")
    ? Number(localStorage.getItem("userScore"))
    : 0;

  let pcScore = localStorage.getItem("pcScore")
    ? Number(localStorage.getItem("pcScore"))
    : 0;

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

  // rule  all
const rulesBox = document.createElement("div");
rulesBox.classList.add("rulesBox");

rulesBox.innerHTML = `
  <button class="rulesCloseBtn">✕</button>
  <img src="assets/rule.png" width="220" alt="Rules">
`;

document.body.appendChild(rulesBox);

if (rulesBtn) {
  rulesBtn.addEventListener("click", () => {
    rulesBox.classList.toggle("show");
  });
}

rulesBox.querySelector(".rulesCloseBtn")
  .addEventListener("click", () => {
    rulesBox.classList.remove("show");
  });
  


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

  nextBtn.style.display = "none";
  playAgainBtn.style.display = "block";

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
  } else {
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
}
  //buttons
  playAgainBtn.onclick = resetGameUI;

if (winnerPlayAgain) {
  winnerPlayAgain.onclick = resetGameUI;
}
  nextBtn.onclick = () => {
    resultArea.style.display = "none";
    winnerScreen.style.display = "flex";
  };

   
 
  
