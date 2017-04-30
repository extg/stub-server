
import matchPath from './matchPath'

// TODO: упростить логику, перенменные нормально назвать
// TODO: а то с этими match можно запутаться
/**
 * Получает коллекцию routes, где клю
 * @param {Object} routes - маршруты, ключами являются path, например, {'/user/:id': 'John Doe'}, значения произвольные
 * @param {String} pathname - запрос, например, '/user/1'
 */
const matchRoute = (routes, pathname) =>
  Object.keys(routes)
    .map(pattern => ({
      data: routes[pattern],
      match: matchPath(pathname, pattern)
    }))
    .find(({match}) => match !== null)

export default matchRoute
