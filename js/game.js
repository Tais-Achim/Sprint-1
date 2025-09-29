'use strict'

const FLAG = ''

const gGame = {
    score: 0,
    isOn: false
}

const gLevel = {
    SIZE: 4,
    MINES: 2
}
var gBoard
var gRevealedCells
var gCellsOnBoard
var gCellsOnBoard
var gFirstClick
var gFirstClickRow
var gFirstClickCol
var gLifeCount

const FLAG_IMG = '<img src="img/pirate-flag.png">'

function init() {

    gBoard = buildBoard()
    renderBoard(gBoard)

    gFirstClick = true
    gRevealedCells = 0
    gLifeCount = 3

    hideElement('.gameover')
    hideElement('.victory')

    gGame.isOn = true
}

function buildBoard() {
    const board = createMat(gLevel.SIZE)
    gCellsOnBoard = board.length * board.length
    console.log(gCellsOnBoard)
    // const size = gLevel.SIZE

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            board[i][j] = {
                minesArountCount: 0,
                isRevealed: false,
                isMine: false,
                isMarked: false
            }


        }
    }
    // gMinesOnBoard = 0
    // board[0][0].isMine = board[1][1].isMine = true
    // gMinesOnBoard += 2
    return board

}

function onCellClicked(elCell, i, j) {
    if (!gGame.isOn) return
    const cell = gBoard[i][j]
    if (cell.isRevealed || cell.isMarked) return


    if (gFirstClick) {
        gFirstClickRow = i
        gFirstClickCol = j
        placeMines(gBoard)
        updateMinesAroundCount()
        gFirstClick = false
        renderMines(gBoard)
    }

    if (cell.isMine) {
        gameOver()
        var elData = elCell.querySelector('.data.hide')
        elData.classList.remove('hide')
        elCell.style.backgroundColor = 'black'
        return
    }



    cell.isRevealed = true
    gRevealedCells++

    expandReveal(gBoard, elCell, i, j)
    // console.log(gCellsOnBoard)
    // console.log(gMinesOnBoard)

    if (gRevealedCells === gCellsOnBoard - gMinesOnBoard) victory()
    // console.log(gRevealedCells)


    var elData = elCell.querySelector('.data.hide')
    elData.classList.remove('hide')
    elCell.classList.add('cell-reveal')
}

// function updateScore(diff) {
//     // Model
//     gGame.score += diff

//     // DOM
//     const elScore = document.querySelector('.score span')
//     elScore.innerText = gGame.score

// }

function expandReveal(board, elCell, i, j) {
    const cell = board[i][j]
    const negArr = []
    if (elCell.innerHTML === '') {
        for (var x = i - 1; x <= i + 1; x++) {

            if (x < 0 || x >= board.length) continue

            for (var y = j - 1; y <= j + 1; y++) {

                if (x === i && y === j) continue
                if (y < 0 || y >= board[i].length) continue

                board[]
            }
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
}

function victory() {
    gGame.isOn = false
    showElement('.victory')
}

function hideElement(selector) {
    const el = document.querySelector(selector)
    el.classList.add('hide')
}

function showElement(selector) {
    const el = document.querySelector(selector)
    el.classList.remove('hide')
}

function lifeDown() {
    if (gLifeCount > 0) {
        gLifeCount--

        // DOMException
    } else {
        gameOver
    }
}
