
import path from 'path'
import webpack from 'webpack'
import NpmInstallPlugin from 'npm-install-webpack-plugin'

const compile = (file) => {
  return new Promise((resolve, reject) => {
    const fileDir = path.dirname(file)
    const fileExt = path.extname(file)
    const fileName = path.basename(file, fileExt)
    // TODO: вынести в отдельное место установку паттерна имени файла
    // TODO: возможно с помощью loader-utils
    // TODO: чтобы в require ниже использовать и для output.filename
    // TODO: но возможно имя файла можно брать и из модуля
    const fileBundlePath = path.join(fileDir, `${fileName}.bundle.js`)

    // TODO: Compiling to Memory https://webpack.js.org/api/node/#compiling-to-memory
    // TODO: webpack npm install plugin
    webpack({
      target: 'node',
      entry: {
        [fileName]: file
      },
      output: {
        filename: '[name].bundle.js',
        libraryTarget: 'commonjs-module',
        path: fileDir
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: [
              /node_modules/
            ],
            loader: 'babel-loader'
          }
        ]
      },
      plugins: [
        new NpmInstallPlugin({
          // Use --save or --save-dev
          dev: false,
          // Install missing peerDependencies
          peerDependencies: true,
          // Reduce amount of console logging
          quiet: false,
        })
      ]
    }, (err, stats) => {
      if (err || stats.hasErrors()) {
        const matches = /(?:(?:Cannot resolve module)|(?:Can't resolve)) '([@\w\/\.-]+)' in/.exec(stats.toString())

        if (matches[1]) {
          resolve(compile(file))
        } else {
          reject(stats)
        }
      } else {
        resolve(stats)
      }
    })
  })
}

export default compile
