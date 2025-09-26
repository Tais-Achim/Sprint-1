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

function init() {

    gBoard = buildBoard()
    renderBoard(gBoard)

    gFirstClick = true
    gRevealedCells = 0

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
    if (cell.isRevealed) return


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
        var elSpan = elCell.querySelector('span')
        elSpan.classList.remove('hide')
        elCell.style.backgroundColor = 'black'
        return
    }



    cell.isRevealed = true
    gRevealedCells++

    // console.log(gCellsOnBoard)
    // console.log(gMinesOnBoard)

    if (gRevealedCells === gCellsOnBoard - gMinesOnBoard) victory()
    // console.log(gRevealedCells)


    var elSpan = elCell.querySelector('span')
    elSpan.classList.remove('hide')
    elCell.classList.add('cell-reveal')
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


