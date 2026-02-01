   const choices = ["stone", "paper", "scissor"];

const againstText = document.getElementById("againstText");

// local storage scores
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

// initial UI
userScoreEl.innerText = userScore;
pcScoreEl.innerText = pcScore;

triangle.style.display = "flex";
resultArea.style.display = "none";
nextBtn.style.display = "none";

// =rules box
const rulesBtn = document.querySelector(".rules");

const rulesBox = document.createElement("div");
rulesBox.innerHTML = `
  <button class="closrbtn">X</button>
  <img src="assets/rule.png" width="220">
`;

rulesBox.style.cssText =
  "display:none; position:fixed; right:20px; bottom:80px;";

document.body.appendChild(rulesBox);

// cose btn
const closeBtn = rulesBox.querySelector(".closrbtn");

closeBtn.onclick = () => {
  rulesBox.style.display = "none";
};

rulesBtn.onclick = () => {
  rulesBox.style.display =
    rulesBox.style.display === "none" ? "block" : "none";
};

function playGame(userChoice) {
  const pcChoice = choices[Math.floor(Math.random() * 3)];

  triangle.style.display = "none";
  resultArea.style.display = "block";

  // reset
  userPick.classList.remove("winner");
  pcPick.classList.remove("winner");

  userPick.className = `circle ${userChoice}`;
  pcPick.className = `circle ${pcChoice}`;

  userPick.innerHTML = `<img src="assets/${userChoice}.png">`;
  pcPick.innerHTML = `<img src="assets/${pcChoice}.png">`;

  nextBtn.style.display = "none";
  playAgainBtn.style.display = "block";

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

    playAgainBtn.innerText = "PLAY AGAIN";
    nextBtn.style.display = "block";

    userPick.classList.add("winner");
  } else {
    resultText.innerText = "YOU LOST";

    pcScore++;
    pcScoreEl.innerText = pcScore;
    localStorage.setItem("pcScore", pcScore);

    playAgainBtn.innerText = "PLAY AGAIN";
  }
}


playAgainBtn.onclick = () => {
  userPick.classList.remove("winner");
  pcPick.classList.remove("winner");

  resultArea.style.display = "none";
  triangle.style.display = "flex";
};

nextBtn.onclick = () => {
  userPick.classList.remove("winner");
  alert("NEXT clicked");
};
