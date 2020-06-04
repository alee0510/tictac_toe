let board = document.getElementById('board')
let info = document.getElementById("info")
let data = [['', '', ''], ['', '', ''], ['', '', '']]
let player, status

// add event listener
function play (index) {
    document.getElementsByTagName('button')[0].disabled = true
    document.getElementsByTagName('button')[1].disabled = true
    player = index
    info.textContent = index ? 'O turn' : 'X turn'
    info.hidden = false
    board.hidden = false
    showGameBoard()
}

// generate box
function showGameBoard () {
    let result = []
    for (let i = 0; i < data.length; i++) {
        let tr = ''
        for (let j = 0; j < data.length; j++) {
            if (data[i][j] === '') {
                tr += `<td onclick="playerPlay(${i}, ${j})"></td>`
            } else if (data[i][j] === 0) {
                tr += `<td>X</td>`
            } else if (data[i][j] === 1) {
                tr += `<td>O</td>`
            }
        }
        tr += '</tr>'
        result.push(tr)
    }

    board.innerHTML = result.join('')
}

function playerPlay (i, j) {
    if (status) return

    data[i][j] = player ? 1 : 0
    
    showGameBoard()
    
    // check winner
    status = [
        checkHorizontal(data, player), 
        checkVertical(player), 
        checkCross(player)
    ].includes(true)

    if (status || checkDraw()) {
        info.textContent = status ? `Player ${player ? 'O' : 'X'} WIN` : `DRAW!`
        document.getElementsByTagName('button')[2].hidden = false
        status = true
        return
    }

    changePlayer()
}

function changePlayer () {
    player = player ? 0 : 1
    info.textContent = player ? 'O turn' : 'X turn'
}

function checkHorizontal (data, player) {
    return data.map(item => item = item.every(value => value === player)).includes(true)
}

function checkVertical (player) {
    let result = []
    for (let i = 0; i < data.length; i++) {
        let temp = []
        for (let j = 0; j < data.length; j++) {
            temp.push(data[j][i])
        }
        result.push(temp)
    }
    return checkHorizontal(result, player)
}

function checkCross (player) {
    let cross1 = [], cross2 = [], n = data.length - 1
    for (let i = 0; i < data.length; i++) {
        cross1.push(data[i][i])
        cross2.push(data[i][n])
        n--
    }
    cross1 = cross1.every(item => item === player)
    cross2 = cross2.every(item => item === player) 
    return cross1 || cross2
}

function checkDraw () {
    return data.map(item => item = item.every(value => value !== '')).every(item => item === true)
}

function reset () {
    data = [['', '', ''], ['', '', ''], ['', '', '']]
    player = ''
    status = ''
    document.getElementsByTagName('button')[0].disabled = false
    document.getElementsByTagName('button')[1].disabled = false
    document.getElementsByTagName('button')[2].hidden = true
    info.textContent = ''
    info.hidden = true
    board.hidden = true
    console.log(data)
}

showGameBoard()