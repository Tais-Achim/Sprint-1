'use strict'

const MINE_IMG = '<img src="img/mine1.png">'
// const MINE_IMG = '💣'
var gMinesOnBoard

var elMineCount = document.querySelector('.minecount span')
elMineCount.innerText = gLevel.MINES


function setMinesNegsCount(rowIdx, colIdx) {
    var count = 0


    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {

        if (i < 0 || i >= gBoard.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {

            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= gBoard[i].length) continue

            if (gBoard[i][j].isMine) count++
        }
    }
    return count
}

function updateMinesAroundCount() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            gBoard[i][j].minesAroundCount = setMinesNegsCount(i, j)
        }
    }
}

function placeMines(board) {
    gMinesOnBoard = 0

    while (gLevel.MINES > gMinesOnBoard) {

        var randRow = getRandomIntInclusive(0, board.length - 1)
        var randCol = getRandomIntInclusive(0, board[0].length - 1)

        if (gFirstClickRow === randRow && gFirstClickCol === randCol) continue

        var mineLocation = board[randRow][randCol]
        mineLocation.isMine = true
        gMinesOnBoard++
    }
    return board
}

function renderMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            const currCell = board[i][j]
            const elData = document.querySelector(`.cell-${i}-${j} .data`)

            if (currCell.isMine) {
                elData.innerHTML = MINE_IMG
            } else {
                if (currCell.minesAroundCount > 0) {
                    elData.innerHTML = currCell.minesAroundCount
                } else {
                    elData.innerHTML = ''
                }
            }
        }
    }
}


// function addBalls() {

//     var randPos = checkEmptyCells()

//     gBoard[randPos.i][randPos.j].gameElement = BALL
//     renderCell(randPos, BALL_IMG)
//     updateNeighborCount()
// }


// function countNeighbors(rowIdx, colIdx, mat) {
//     var neighborsCount = 0

//     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//         if (i < 0 || i >= mat.length) continue

//         for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//             if (i === rowIdx && j === colIdx) continue
//             if (j < 0 || j >= mat[i].length) continue
//             if (mat[i][j] === LIFE) neighborsCount++
//         }
//     }
//     return neighborsCount
// }