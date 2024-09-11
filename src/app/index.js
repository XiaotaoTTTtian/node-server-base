const Koa = require('koa')
// const { koaBody } = require('koa-body')
const bodyParser = require('koa-bodyparser');


const userRouter = require('../router/user.router')
const errHandler = require('./errHandler')

const app = new Koa()

app.use(bodyParser())
app.use(userRouter.routes())
app.on('error', errHandler)
module.exports = app