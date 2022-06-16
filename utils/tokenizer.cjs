const path = ['.', '/', '..', ':']

function tokenizer(input) {
  // cursor
  let cursor = 0

  //value
  let name = ''

  // is name
  let isName = true

  // tokens
  let tokens = []

  while (cursor < input.length) {
    let char = input[cursor]

    // skip whitespace
    let WHITESPACE = /\s/
    if (WHITESPACE.test(char)) {
      cursor++
      continue
    }

    if (char === '-' && input[cursor + 1] === '-') {
      tokens.push({
        type: 'dash',
        value: '--',
      })
      cursor += 2
      continue
    }

    if (char === '=') {
      if (name.length > 0) {
        tokens.push({
          type: 'name',
          value: name,
        })
        name = ''
      }

      tokens.push({
        type: 'assign',
        value: '=',
      })

      cursor++
      continue
    }

    if (path.includes(char)) {
      if (name.length > 0) {
        tokens.push({
          type: 'name',
          value: name,
        })
        name = ''
      }
      tokens.push({
        type: 'path',
        value: char,
      })
      cursor++
      continue
    }

    // check if char is a letter
    let LETTER = /[a-z]/i
    if (LETTER.test(char) || char === '-' || char === '_') {
      name += char
      cursor++
    } else {
      tokens.push({ type: 'name', name })
      name = ''
    }
  }

  if (name.length > 0) {
    tokens.push({
      type: 'name',
      value: name,
    })
    name = ''
  }

  return tokens
}

module.exports = tokenizer
