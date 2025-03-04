const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const announceResult = (type, player) => {
  const result = document.querySelector(".result");
  if (type === "tie") {
    result.innerText = `MATCH HAS BEEN TIE`;
  } else {
    result.innerText = `Congratulation, The winner is ${player}`;
  }
  result.classList.remove("hide");
  document.querySelector(".reset").innerText = "NEW GAME";
};

const disableAllBoxes = (boxes) => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const checkWinner = (boxes, player) => {
  for (const pattern of winPatterns) {
    if (pattern.every((index) => boxes[index].innerText !== "")) {
      const content = boxes[pattern[0]].innerText;
      if (pattern.every((index) => boxes[index].innerText === content)) {
        disableAllBoxes(boxes);
        announceResult("win", player);
      }
    }
  }
};

const putToken = (boxes) => {
  let count = 0;
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (count % 2 === 0) {
        box.innerText = "X";
        checkWinner(boxes, "X");
      } else {
        box.innerText = "O";
        checkWinner(boxes, "O");
      }
      box.disabled = true;
      count++;
      if (count === 9) {
        announceResult("tie");
      }
      console.log(count);
    });
  });
};

const handleReset = (reset, boxes) => {
  reset.addEventListener("click", () => {
    reset.innerText = "RESET";
    boxes.forEach((box) => {
      box.disabled = false;
      box.innerText = "";
    });
    document.querySelector(".result").classList.add("hide");
  });
};

const start = () => {
  const boxes = document.querySelectorAll(".box");
  const reset = document.querySelector(".reset");
  handleReset(reset, boxes);
  putToken(boxes);
};

window.onload = start;
