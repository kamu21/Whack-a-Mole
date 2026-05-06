window.onload = () => {
  setToday();
  setGreeting();

  // ★ここに追加
  document.addEventListener("contextmenu", e => e.preventDefault());

  initGame();
};

// --------------------
// 挨拶
// --------------------
function setGreeting() {
  const hour = new Date().getHours();
  let greeting = "";

  if (hour >= 5 && hour < 11) {
    greeting = "おはようございます";
  } else if (hour >= 11 && hour < 17) {
    greeting = "こんにちは";
  } else if (hour >= 17 && hour < 22) {
    greeting = "こんばんは";
  } else {
    greeting = "夜ふかしですね";
  }

  document.getElementById("greetingText").textContent = greeting + "！";
}

// --------------------
// 日付
// --------------------
function setToday() {
  const d = new Date();
  const week = ["日","月","火","水","木","金","土"];

  document.getElementById("todayText").textContent =
    `今日は ${d.getMonth() + 1}月${d.getDate()}日 ${week[d.getDay()]}曜日です`;
}

// --------------------
// ゲーム初期化（ここ重要）
// --------------------
function initGame() {
  const board = document.getElementById("board");
  const timeEl = document.getElementById("time");
  const resultScore = document.getElementById("resultScore");
  const hitSound = document.getElementById("hitSound");

  let score = 0;
  let time = 180;
  let active = false;
  let mole = null;
  let timer;

  // 9穴作成
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement("div");
    hole.className = "hole";
    board.appendChild(hole);
  }

  // スタート
  window.startGame = function () {
    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("gameScreen").classList.remove("hidden");

    score = 0;
    time = 180;
    active = true;

    spawnMole();

    timer = setInterval(() => {
      time--;
      timeEl.textContent = time;

      if (time <= 0) endGame();
    }, 1000);
  };

  // モグラ
  function spawnMole() {
    if (!active) return;

    const holes = document.querySelectorAll(".hole");
    const index = Math.floor(Math.random() * 9);

    mole = document.createElement("img");
    mole.src = "mole.png";
    mole.className = "mole";

    mole.onclick = () => {
      if (!active) return;

      score++;

      hitSound.currentTime = 0;
      hitSound.play();

      mole.remove();
      mole = null;

      setTimeout(() => {
        spawnMole();
      }, 2000);
    };

    holes[index].appendChild(mole);
  }

  // 終了
  function endGame() {
    active = false;
    clearInterval(timer);

    if (mole) mole.remove();

    document.getElementById("gameScreen").classList.add("hidden");
    document.getElementById("resultScreen").classList.remove("hidden");

    resultScore.textContent = score;
  }
}
