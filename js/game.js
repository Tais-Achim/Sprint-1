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
var gMinesOnBoard

function init() {

    gBoard = buildBoard()
    updateMinesAroundCount()
    renderBoard(gBoard)

    hideElement('.gameover')
    hideElement('.victory')

    gGame.isOn = true
}


// gGame = {
//     isOn: false,
//     revealedCount: 0,
//     markedCount: 0,
//     secsPassed: 0
// }

// onInit() Called when page loads
// buildBoard() Builds the board
// Set some mines
// Call setMinesNegsCount()
// Return the created board
// setMinesNegsCount(board) Count mines around each cell
// and set the cell's
// minesAroundCount.
// renderBoard(board) Render the board as a <table>
// to the page
// onCellClicked(elCell, i, j) Called when a cell is clicked
// onCellMarked(elCell, i, j) Called when a cell is rightclicked
// See how you can hide the context
// menu on right click

// checkGameOver() The game ends when all mines
// are marked, and all the other
// cells are revealed
// expandReveal(board, elCell,
// i, j)
// When the user clicks a cell with
// no mines around, reveal not
// only that cell, but also its
// neighbors.
// NOTE: start with a basic
// implementation that only
// reveals the non-mine 1st degree
// neighbors
// BONUS: Do it like the real
// algorithm (see description at
// the Bonuses section below)



function buildBoard() {
    const board = createMat(gLevel.SIZE)
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
    var minePlacement = 0

    while (gLevel.MINES > minePlacement) {
        const randRow = getRandomIntInclusive(0, board.length - 1)
        const randCol = getRandomIntInclusive(0, board[0].length - 1)
        const mineLocation = board[randRow][randCol]
        mineLocation.isMine = true
        minePlacement++
    }
    // board[0][0].isMine = board[1][1].isMine = true
    return board
}


// function updateScore(diff) {
//     // Model
//     gGame.score += diff

//     // DOM
//     const elScore = document.querySelector('.score span')
//     elScore.innerText = gGame.score

// }

function gameOver() {
    gGame.isOn = false
    clearInterval(gGhostsInterval)
    gGhosts = []
    showElement('.gameover')
}

function victory() {
    gGame.isOn = false
    clearInterval(gGhostsInterval)
    gGhosts = []
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



