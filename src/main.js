const {APP_PORT} = require('./config/config.default')

const app = require('./app/index.js')



app.listen(APP_PORT, () => {
    console.log('server is running on http://localhost:' + APP_PORT);
    
})