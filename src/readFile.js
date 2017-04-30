
import fs from 'fs'

const readFile = (file) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })

export default readFile
