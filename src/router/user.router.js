const Router = require('koa-router')

const {register, login} = require('./controller/user.controller')
const {userValidator, verifyUser, cryptPassword, verifyLogin} = require('../middleware/user.middleware')

// const router = new Router()
const router = new Router({prefix: '/users'})

router.post('/register',userValidator, verifyUser,cryptPassword, register)
router.post('/login',userValidator,verifyLogin, login)

module.exports = router