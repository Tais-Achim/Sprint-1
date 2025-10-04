'use strict'

const FLAG = ''
var gBoard
var gRevealedCells
var gCellsOnBoard
var gCellsOnBoard
var gFirstClick
var gFirstClickRow
var gFirstClickCol
var gLifeCount
var gMineCount
const FLAG_IMG = '<img src="img/pirate-flag.png">'
const life = '💚'
const death = '💀'
const gameOnPumpkin = '🎃'
const gameWinEyeroll = '🙄'
const gameOverClown = '🤡'

const gGame = {
    score: 0,
    isOn: false
}

const gLevel1 = {
    SIZE: 4,
    MINES: 2
}

const gLevel2 = {
    SIZE: 8,
    MINES: 14
}

const gLevel3 = {
    SIZE: 12,
    MINES: 32
}

function init(size, mines) {
    gMineCount = mines
    var elMineCount = document.querySelector('.minecount span')
    elMineCount.innerText = gMineCount
    gBoard = buildBoard(size)
    difficultyDisplayer(size)
    renderBoard(gBoard)
    smileyButtonCreator()
    smileyButtonUpdator(gameOnPumpkin)

    gFirstClick = true
    gRevealedCells = 0
    gLifeCount = 3
    renderLives()

    hideElement('.gameover')
    hideElement('.victory')

    gGame.isOn = true
    gGame.score = 0
    var elScore = document.querySelector('.score span')
    elScore.innerText = gGame.score
}

function buildBoard(difficulty) {
    const board = createMat(difficulty)
    gCellsOnBoard = board.length * board.length

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isRevealed: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    return board
}

function difficultyDisplayer(difficulty) {
    var elDifficulty = document.querySelector('.difficulty span')
    if (difficulty === 4) {
        elDifficulty.innerText = 'Beginner'
        elDifficulty.style.color = 'rgba(89, 221, 37, 1)'
    }
    else if (difficulty === 8) {
        elDifficulty.innerText = 'Intermediate'
        elDifficulty.style.color = 'rgba(64, 187, 187, 1)'
    }
    else if (difficulty === 12) {
        elDifficulty.innerText = 'Expert'
        elDifficulty.style.color = 'rgba(190, 40, 110, 1)'
    }
}

function smileyButtonCreator() {
    const elBtnBox = document.querySelector('.button-box')
    var strHtml = ''
    strHtml += `<button class="smiley" onclick="init(gLevel1.SIZE, gLevel1.MINES)">${gameOnPumpkin}</button>`
    elBtnBox.innerHTML = strHtml
}

function smileyButtonUpdator(state) {
    const elBtnBox = document.querySelector('.smiley')
    elBtnBox.innerText = state
}

function onCellClicked(elCell, i, j) {
    if (!gGame.isOn) return

    const cell = gBoard[i][j]

    if (cell.isRevealed || cell.isMarked) return

    if (gFirstClick) {
        gFirstClickRow = i
        gFirstClickCol = j
        placeMines(gBoard, gMineCount)
        updateMinesAroundCount()
        gFirstClick = false
        renderMines(gBoard)
    }


    if (cell.isMine) {
        cell.isRevealed = true
        var elData = elCell.querySelector('.data.hide')
        elData.classList.remove('hide')
        elCell.style.backgroundColor = 'black'
        gLifeCount--
        renderLives()
        if (gLifeCount > 0) {
            mineClickWarning(elCell, cell)
        }
        else {
            gameOver()
        }
        return
    }

    cell.isRevealed = true
    gRevealedCells++
    updateGameScore()

    if (cell.minesAroundCount === 0) {
        expandReveal(gBoard, i, j)
    }

    if (gRevealedCells === gCellsOnBoard - gMinesOnBoard) victory()

    var elData = elCell.querySelector('.data.hide')
    elData.classList.remove('hide')
    elCell.classList.add('cell-reveal')
}

function renderLives() {
    const elLives = document.querySelector('.lives span')
    if (gLifeCount === 3) {
        elLives.innerText = life + life + life
    }
    else if (gLifeCount === 2) {
        elLives.innerText = life + life
    }
    else if (gLifeCount === 1) {
        elLives.innerText = life
    }
    else {
        elLives.innerText = death
    }
}

function mineClickWarning(elCell, cell) {
    showElement('.mine-click')
    setTimeout(() => {
        cell.isRevealed = false
        hideElement('.mine-click')
        var elData = elCell.querySelector('.data')
        elData.classList.add('hide')
        elCell.style.backgroundColor = ''
    }, 2000)
}


function expandReveal(board, x, y) {
    for (var i = x - 1; i <= x + 1; i++) {

        if (i < 0 || i >= board.length) continue

        for (var j = y - 1; j <= y + 1; j++) {

            if (i === x && j === y) continue
            if (j < 0 || j >= board[i].length) continue

            var cell = board[i][j]
            if (cell.isRevealed || cell.isMarked || cell.isMine) continue

            cell.isRevealed = true
            gRevealedCells++
            updateGameScore()

            var elCell = document.querySelector(`.cell-${i}-${j}`)
            var elData = elCell.querySelector('.data.hide')
            elData.classList.remove('hide')
            elCell.classList.add('cell-reveal')
        }
    }
}

function onCellMarked(elCell, i, j) {
    if (!gGame.isOn) return false
    const cell = gBoard[i][j]
    if (cell.isRevealed) return false

    cell.isMarked = !cell.isMarked

    const elMark = elCell.querySelector('.mark')
    if (cell.isMarked) {
        elMark.innerHTML = FLAG_IMG
    } else {
        elMark.innerHTML = ''
    }
    return false
}

function gameOver() {
    gGame.isOn = false
    showElement('.gameover')
    smileyButtonUpdator(gameOverClown)
    // const audio = new Audio('audio/clown-circus-music.mp3')
    // audio.play()
}

function victory() {
    gGame.isOn = false
    showElement('.victory')
    smileyButtonUpdator(gameWinEyeroll)
    // const audio = new Audio('audio/haha-victory.mp3')
    // audio.play()
}

function hideElement(selector) {
    const el = document.querySelector(selector)
    el.classList.add('hide')
}

function showElement(selector) {
    const el = document.querySelector(selector)
    el.classList.remove('hide')
}

function updateGameScore() {
    gGame.score++
    var elScore = document.querySelector('.score span')
    elScore.innerText = gGame.score
}