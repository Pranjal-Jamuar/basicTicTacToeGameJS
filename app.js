let playerText = document.getElementById("playerText")
const restartBtn = document.getElementById("restartBtn")
let boxes = Array.from(document.getElementsByClassName("box"))
const winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
)
const drawIndicator = getComputedStyle(document.body).getPropertyValue(
  "--draw-indicator"
)

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)
let countPlays = 0

const startGame = () => {
  boxes.forEach(box => box.addEventListener("click", boxClicked))
}

function boxClicked(e) {
  const id = e.target.id

  if (!spaces[id] && countPlays < 9) {
    spaces[id] = currentPlayer
    e.target.innerText = currentPlayer

    if (playerHasWon() !== false) {
      playerText.innerText = `${currentPlayer} has won!🎉🎊🎉🎊`
      let winningBlocks = playerHasWon()
      countPlays = 10
      winningBlocks.map(
        box => (boxes[box].style.backgroundColor = winnerIndicator)
      )
      return
    }
    countPlays++
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
  }
  if (countPlays === 9) {
    playerText.innerText = "Game is Drawn😒😒😒"
    boxes.forEach(box => (box.style.color = drawIndicator))
  }
}

let winningCombinationsArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function playerHasWon() {
  for (const winningCondition of winningCombinationsArray) {
    let [a, b, c] = winningCondition

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c]
    }
  }
  return false
}

restartBtn.addEventListener("click", restart)

function restart() {
  spaces.fill(null)
  countPlays = 0
  boxes.forEach(box => {
    box.innerText = ""
    box.style.backgroundColor = ""
    box.style.color = "#f2c14e"
  })

  playerText.innerText = "Tic Tac Toe"

  currentPlayer = X_TEXT
}

startGame()
