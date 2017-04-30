
import path from 'path'

import compile from './compile'

const readJs = (file) => {

  const fileDir = path.dirname(file)
  const fileExt = path.extname(file)
  const fileName = path.basename(file, fileExt)
  // TODO: вынести в отдельное место установку паттерна имени файла
  // TODO: возможно с помощью loader-utils
  // TODO: чтобы в require ниже использовать и для output.filename
  // TODO: но возможно имя файла можно брать и из модуля
  const fileBundlePath = path.join(fileDir, `${fileName}.bundle.js`)

  return compile(file)
    .then(stats => {
      delete require.cache[require.resolve(fileBundlePath)]

      return require(fileBundlePath)
    })
}

export default readJs
