
import fs from 'fs'
import url from 'url'
import path from 'path'
import JSON5 from 'json5'
import express from 'express'

import readFile from './readFile'
import readJson from './readJson'
import readJs from './readJs'
import matchRoute from './matchRoute'
import ensureOriginHeaderPresent from './ensureOriginHeaderPresent'

// TODO: ensure that paths is correct
const storagePath = path.resolve('storage')
const configPath = path.resolve('config.json')
const app = express()

// TODO: добавить логирование

app.use(ensureOriginHeaderPresent)

app.all('*', function (req, res) {
  const origin = url.parse(req.headers.origin)

  readFile(configPath)
    .then(configData => {
      const config = JSON5.parse(configData.toString())
      const route = matchRoute(config[origin.host], req.path)

      // возвращаем специальный код ответа если не нашли ни одного совпадения
      if (!route || !route.data) {
        throw new Error(`Not found route ${req.path}`)
      }

      // устанавливаем именованные параметры пути (нужно прежде всего для readJs)
      req.params = route.match.params

      const filePath = path.join(storagePath, origin.host, route.data)
      const fileExt = path.extname(filePath)

      if (fileExt === '.json')
        return readJson(filePath)
          .then(data => {
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify(data))
          })
      else if (fileExt === '.js')
        return readJs(filePath)
          .then(callback => (callback.default || callback)(req, res))
      else throw new Error(`Unknown file format ${fileExt}`)
    })
    .catch(err => {
      if (err) {
        console.log(err)
        // TODO: вынести коды в отдельный файл
        // 305 - User Proxy
        res.status(305).send()
      }
    })
})

app.listen(process.env.NODE_PORT, () => {
  console.log(`Server started: http://localhost:${process.env.NODE_PORT}`)
})
