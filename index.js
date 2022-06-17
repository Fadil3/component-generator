import fs from 'fs'
import tokenizer from './utils/tokenizer.cjs'
import parser from './utils/parser.cjs'
import generator from './utils/generator.cjs'

// retrieve arguments from the command line
const args = process.argv.slice(2)

// example command : component --name=my-component --function=arrow --styling=module --path=./components/my-component

const tokens = []

args.forEach((arg) => {
  // save to token
  tokens.push(...tokenizer(arg))
})

//shift the first token
const arg1 = tokens.shift()

const parsedToken = parser(tokens, arg1)

const state = {}

// fill the state with the parsed token
parsedToken.arguments.forEach((arg) => {
  if (arg.type === 'name') {
    state.name = arg.value
  }
  if (arg.type === 'path') {
    state.path = arg.value
  }
  if (arg.type === 'function') {
    state.function = arg.value
  }
  if (arg.type === 'styling') {
    state.styling = arg.value
  }
})
console.log(generator(state))

// check if path is valid
const checkPath = (path) => {
  // check if path doesn't exist
  if (!fs.existsSync(path)) {
    // create the path recursively
    fs.mkdirSync(path, { recursive: true })
    console.log('Path created')
  } else {
    createFile(state.name, state.style, state.path)
  }
}

// create a file with the name of the component
const createFile = (name, style, path) => {
  const fileName = `${name}.js`
  const filePath = `${path}/${fileName}`
  const fileContent = `import React from 'react'\n
  import './${name}.css'\n\nexport default () => (\n<div className="${style}">\n${name}\n  </div>\n)\n`

  // write the file
  fs.writeFileSync(filePath, fileContent)
  // console.log(`File ${fileName} created`)
}

// checkPath(path)
