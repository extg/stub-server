
const ensureOriginHeaderPresent = (req, res, next) => {
  if (!req.headers.origin) {
    // если отсутсвет специальный заголовок, то возвращаем статус 523
    // TODO: вынести сообщения в отдельный файл
    console.log('Header "origin" is missing!')
    // TODO: вынести коды в отдельный файл
    res.status(523).send('Header "origin" is missing!')
  } else {
    next()
  }
}

export default ensureOriginHeaderPresent
