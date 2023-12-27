let apiRoot = ''
if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8080'
}
if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'https://trello-api-l5it.onrender.com/'
}
console.log('🚀 ~ apiRoot:', apiRoot)

export const API_ROOT = apiRoot
