'use strict'
const store = require('../store')
const api = require('./api')
const ui = require('./ui')

document.turn = 'X'
document.winner = null
document.wins = ''

const setMessage = function (msg) {
  document.getElementById('message').innerText = msg
}

const startGame = function () {
  event.preventDefault()

  for (let i = 1; i <= 9; i++) {
    clearBox(i)
  }

  document.winner = null

  api.createGame()
  .then(ui.createGameSuccess)
  .catch(ui.createGameFailure)

  setMessage(document.turn + ' - It\'s your turn to start. Select an empty square.')
}
const gatherDataForUpdateGame = function () {
  index =
  token =
  gamevalue =

  api.updateGame(index, token, game)
  .then(ui.updateGameSuccess)
    .catch(ui.updateGameFailure)
}

const trackWins = function () {
  document.wins = document.wins++
  store.wins = document.wins
  gatherDataForUpdateGame()
}

const playerMove = function () {
  nextMove(this)
}

const nextMove = function (square) {
  if (document.winner != null) {
    setMessage(document.turn + ' already won. This game is over.')
  } else if (square.innerText === '') {
    square.innerText = document.turn
    switchTurn()
  } else if (square.innerText === 'X' || square.innerText === 'O') {
    setMessage('Pick another different square.')
  } else {
    setMessage('Pick another different square.')
  }
}

// switch document.turn from X to O and vice versa
const switchTurn = function () {
  if (checkForWinner(document.turn)) {
    setMessage('Congratulations ' + document.turn + ', you won!')
    trackWins()
    document.winner = document.turn
  } else if (checkGameOver()) {
    setMessage('Tied Game !')
  } else if (document.turn === 'X') {
    document.turn = 'O'
    setMessage(document.turn + ' - It\'s your turn. Select an empty square.')
  } else {
    document.turn = 'X'
    setMessage(document.turn + ' - It\'s your turn. Select an empty square.')
  }
}

const checkForWinner = function (move) {
  let result = false

  if (checkRow(1, 2, 3, move) ||
  checkRow(4, 5, 6, move) ||
  checkRow(7, 8, 9, move) ||
  checkRow(1, 4, 7, move) ||
  checkRow(2, 5, 8, move) ||
  checkRow(1, 5, 9, move) ||
  checkRow(3, 5, 7, move) ||
  checkRow(3, 6, 9, move)) {
    result = true
  }
  return result
}

const checkGameOver = function () {
  let result = false

  if (document.getElementById('s1').innerText !== '' &&
  document.getElementById('s2').innerText !== '' &&
  document.getElementById('s3').innerText !== '' &&
  document.getElementById('s4').innerText !== '' &&
  document.getElementById('s5').innerText !== '' &&
  document.getElementById('s6').innerText !== '' &&
  document.getElementById('s7').innerText !== '' &&
  document.getElementById('s8').innerText !== '' &&
  document.getElementById('s9').innerText !== '') {
    result = true
  }
  return result
}

// compare and return boolean (true or false)
const checkRow = function (a, b, c, move) {
  let result = false

  if (getBox(a) === move && getBox(b) === move && getBox(c) === move) {
    result = true
  }
  return result
}

// return the value of the row
const getBox = function (number) {
  return document.getElementById('s' + number).innerText
}

const clearBox = function (number) {
  document.getElementById('s' + number).innerText = ''
}

const addHandlers = function () {
  $('#new-game').on('click', startGame)
  $('#s1').on('click', playerMove)
  $('#s2').on('click', playerMove)
  $('#s3').on('click', playerMove)
  $('#s4').on('click', playerMove)
  $('#s5').on('click', playerMove)
  $('#s6').on('click', playerMove)
  $('#s7').on('click', playerMove)
  $('#s8').on('click', playerMove)
  $('#s9').on('click', playerMove)
}

module.exports = {
  addHandlers
}
