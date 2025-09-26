'use strict'

// function renderBoard(mat, selector) {

//     var strHTML = '<table><tbody>'
//     for (var i = 0; i < mat.length; i++) {

//         strHTML += '<tr>'
//         for (var j = 0; j < mat[0].length; j++) {

//             const cell = mat[i][j]
//             const className = `cell cell-${i}-${j}`

//             strHTML += `<td class="${className}">${cell}</td>`
//         }
//         strHTML += '</tr>'
//     }
//     strHTML += '</tbody></table>'

//     const elContainer = document.querySelector(selector)
//     elContainer.innerHTML = strHTML
// }

// location is an object like this - { i: 2, j: 7 }
// function renderCell(location, value) {
//     // Select the elCell and set the value
//     const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
//     elCell.innerHTML = value
// }

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

            strHTML += `\t<td class="cell ${cellClass}" onclick='onCellClicked(this, ${i}, ${j})'><span class="hide">`

            // if (currCell.isMine) {
            //     strHTML += MINE_IMG
            // } else {
            //     if (currCell.minesAroundCount > 0) {
            //         strHTML += currCell.minesAroundCount
            //     } else {
            //         strHTML += ''
            //     }
            // }
            strHTML += '</span></td>\n'
        }
        strHTML += '</tr>\n'
    }
    elBoard.innerHTML = strHTML
}

function renderMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            const currCell = board[i][j]
            const elSpan = document.querySelector(`.cell-${i}-${j} span`)

            if (currCell.isMine) {
                elSpan.innerHTML = MINE_IMG
            } else {
                if (currCell.minesAroundCount > 0) {
                    elSpan.innerHTML = currCell.minesAroundCount
                } else {
                    elSpan.innerHTML += ''
                }
            }
        }
    }
}

function getClassName(position) {
    return `cell-${position.i}-${position.j}`
}



// function onCellMarked(elCell, i, j) {

// }

// function onCellClicked(el) {
//     const el = document.querySelector(selector)
//     el.classList.remove('hide')
// }

// function onCellClicked(elCell, clickedNum) {
//     if (clickedNum !== gNextNum) return
//     if (clickedNum === 1) startTimer()
//     if (clickedNum === gDifficulty) stopTimer()

//     elCell.classList.add('clicked')
//     if (gNextNum < gDifficulty) gNextNum++

//     const elNext = document.querySelector('.next-num span')
//     elNext.innerHTML = gNextNum
// }
