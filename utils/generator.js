import fs from 'fs'

export default function generator({
  name,
  path,
  func = 'default',
  styling = 'none',
}) {
  // check if path doesn't exist
  if (!fs.existsSync(path)) {
    // create the path recursively
    fs.mkdirSync(`${path}`, { recursive: true })
    console.log('Path created')
  }

  //create the component folder
  fs.mkdirSync(`${path}/${name}`, { recursive: true })

  const fileName = `index.jsx`
  const filePath = `${path}/${name}/${fileName}`
  let fileContent
  let cssFileName = ''

  if (styling === 'module') {
    cssFileName = name[0].toUpperCase() + name.substring(1) + '.module' + '.css'

    fs.writeFileSync(`${path}/${name}/${cssFileName}`, '')
  }

  if (func === 'arrow') {
    console.log('Generating default component')
    fileContent = `import React from 'react'
${styling === 'module' ? `import styles from './${cssFileName}'` : ''}
const ${name} = ({}) => {
  return (
    <>
      <h1>${name}</h1>
    </>
  )
}

export default ${name}
`
  } else if (func === 'default') {
    fileContent = `import React from 'react'
${styling === 'module' ? `import styles from './${cssFileName}'` : ''}

export default function ${name}({}) {
  return (
    <>
      <h1>component</h1>
    </>
  )
}
`
  }

  // write the file
  fs.writeFileSync(filePath, fileContent)
  console.log(`File ${fileName} created`)
}
