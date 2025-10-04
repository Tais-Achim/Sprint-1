'use strict'

const MINE_IMG = '<img src="img/mine1.png">'
var gMinesOnBoard
var gMineClickTimeout

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

function placeMines(board, mineCount) {
    gMinesOnBoard = 0

    while (mineCount > gMinesOnBoard) {

        var randRow = getRandomIntInclusive(0, board.length - 1)
        var randCol = getRandomIntInclusive(0, board[0].length - 1)

        if (gFirstClickRow === randRow && gFirstClickCol === randCol) continue

        var mineLocation = board[randRow][randCol]
        if (mineLocation.isMine) continue
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