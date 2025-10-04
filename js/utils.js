'use strict'

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


function createMat(size) {
    const mat = []
    for (var i = 0; i < size; i++) {
        const row = []
        for (var j = 0; j < size; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}


function renderBoard(board) {

    const elBoard = document.querySelector('.board-container')
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < board[i].length; j++) {
            const currCell = board[i][j]

            var cellClass = getClassName({ i: i, j: j })
            if (currCell.isMine) cellClass += ' mine'

            strHTML += `<td class="cell ${cellClass}"
            onclick="onCellClicked(this, ${i}, ${j})"
            oncontextmenu="onCellMarked(this, ${i}, ${j}); return false;">
            <span class="mark"></span>
            <span class="data hide"></span>`
            
            strHTML += '</td>\n'
        }
        strHTML += '</tr>\n'
    }
    elBoard.innerHTML = strHTML
}


function getClassName(position) {
    return `cell-${position.i}-${position.j}`
}

