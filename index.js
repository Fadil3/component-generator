import fs from 'fs'

// retrieve arguments from the command line
const args = process.argv.slice(2)

// example command : component --name=my-component --style=arrow --path=./components/my-component

// get the first argument
const firstArg = args[0]
const componentName = args[1].split('=')[1]
const style = args[2].split('=')[1]
const path = args[3].split('=')[1]
console.log(path)

const state = {
  command: firstArg,
  name: componentName,
  style: style,
  path: path,
}

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
  console.log(`File ${fileName} created`)
}

checkPath(path)
