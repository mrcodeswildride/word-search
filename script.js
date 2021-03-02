let word = document.getElementById(`word`)
let squares = document.getElementsByClassName(`square`)
let messageParagraph = document.getElementById(`messageParagraph`)

word.addEventListener(`input`, findWord)
word.focus()

function findWord() {
  let wordValue = word.value.trim().toUpperCase()

  for (let square of squares) {
    square.classList.remove(`highlighted`)
  }

  messageParagraph.innerHTML = ``

  let successPath

  if (wordValue != ``) {
    for (let square of squares) {
      successPath = visit(square, [], wordValue)

      if (successPath) {
        break
      }
    }

    if (successPath) {
      for (let square of successPath) {
        square.classList.add("highlighted")
      }
    }
    else {
      messageParagraph.innerHTML = `Word not found`
    }
  }
}

function visit(square, path, wordToFind) {
  if (!square || path.includes(square)) {
    return null
  }

  path.push(square)

  let foundWord = path.map(square => square.innerHTML).join(``)

  if (foundWord == wordToFind) {
    return path
  }

  if (foundWord[foundWord.length-1] != wordToFind[foundWord.length-1]) {
    return null
  }

  let neighbors = [
    getNeighbor(square, 1, 0),
    getNeighbor(square, 0, 1),
    getNeighbor(square, -1, 0),
    getNeighbor(square, 0, -1),
  ]

  for (let neighbor of neighbors) {
    let successPath = visit(neighbor, path.slice(), wordToFind)

    if (successPath) {
      return successPath
    }
  }

  return null
}

function getNeighbor(square, xDiff, yDiff) {
  // array of rows
  let rows = document.getElementsByClassName(`row`)

  let row = square.parentElement // row of square
  let y // y coordinate of square, set below
  let x // x coordinate of square, set below

  // loop through rows to determine y
  for (let i = 0; i < rows.length; i++) {
    if (rows[i] == row) {
      y = i // found matching row, so set y
    }
  }

  // loop through squares in row to determine x
  for (let i = 0; i < row.children.length; i++) {
    if (row.children[i] == square) {
      x = i // found matching square, so set x
    }
  }

  // row of neighbor square
  let neighborRow = rows[y + yDiff]

  if (neighborRow == null) {
    // row is beyond edge, so no neighbor square
    return null
  }
  else {
    // if x + xDiff is beyond edge, will be null
    return neighborRow.children[x + xDiff]
  }
}