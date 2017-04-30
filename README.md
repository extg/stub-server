# Stub Proxy Server

В `storage` хранятся директории которые соответсвую имени хостов, в каждом из хостов находится
набор стабов - файлов в формате `.js` или `.json`. Файлы в `.json` формате будут возвращены как есть,
а файлы в формате `.js` должны экспортировать функцию принимающую `(req, res)`.

Пример запроса
```bash
curl -X GET \
  http://localhost:3000/user/1 \
  -H 'origin: https://example.com'
```

## Getting started

```bash
npm install
```

### Run in development mode

```bash
cp .env.example .env
cp config-example.json config.json
npm run server
```

### Run in production mode
```bash
cp .env.example .env
npm run build
NODE_ENV=production node server.js
```
