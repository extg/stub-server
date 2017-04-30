
require('dotenv').config()

global.log = (...vals) => {
  console.log(...vals)

  return vals.pop()
}


if (process.env.NODE_ENV === 'production') {
  require('./dist/server.js');
} else {
  require('babel-register')

  require('./src/server')
}
