function parser(tokens, type = 'component') {
  let current = 0

  const ast = {
    type: type ? type.value : 'component',
    arguments: [],
  }

  while (current < tokens.length) {
    const token = tokens[current]
    // console.log(token)

    if (token.type === 'name') {
      let temp = tokens[current - 1]
      let temp2 = tokens[current - 2]
      if (temp.value === '=') {
        //find temp2 in ast
        let temp3 = ast.arguments.find((arg) => arg.type === temp2.value)
        if (temp3) {
          temp3.value = token.value
        }
      } else {
        ast.arguments.push({
          type: token.value,
          value: '',
        })
      }
      current++
    }

    if (token.type === 'assign' || token.type === 'dash') {
      current++
    }

    if (token.type === 'path') {
      let path = ''
      while (current < tokens.length) {
        const token = tokens[current]
        if (token.type !== 'assign' && token.type !== 'dash') {
          path += token.value
          current++
        } else {
          break
        }
      }
      ast.arguments.push({
        type: 'path',
        value: path,
      })
      current++
    }
  }

  //delete empty arguments
  ast.arguments = ast.arguments.filter((arg) => arg.value.length > 0)

  return ast
}

module.exports = parser
