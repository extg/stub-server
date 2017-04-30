
import JSON5 from 'json5'

import readFile from './readFile'

const readJson = (file) =>
  readFile(file)
    .then(fileData =>
      JSON5.parse(fileData.toString()))

export default readJson
