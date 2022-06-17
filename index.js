import tokenizer from './utils/tokenizer.cjs'
import parser from './utils/parser.cjs'
import generator from './utils/generator.js'

// retrieve arguments from the command line
const args = process.argv.slice(2)

// example command : component --name=Button --function=arrow --styling=module --path=./components

const tokens = []

args.forEach((arg) => {
  // save to token
  tokens.push(...tokenizer(arg))
})

//shift the first token
const arg1 = tokens.shift()

//throw error if the first token is not a component
if (arg1.type !== 'name' && arg1.value !== 'component') {
  throw new Error('The first argument must be a component name')
}

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
    state.func = arg.value
  }
  if (arg.type === 'styling') {
    state.styling = arg.value
  }
})
generator(state)
