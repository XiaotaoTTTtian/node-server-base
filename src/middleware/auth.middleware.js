const jwt = require('jsonwebtoken')
const {tokenExpiredError, invalidToken} = require('../constant/err.type')

const {JWT_SECRET} = require('../config/config.default')

const auth = async (ctx, next) => {
    const {authorization} = ctx.request.header
    const token = authorization.replace('Bearer', '')
    try {
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
    } catch (error) {
        switch (error.name) {
            case 'TokenExpiredError':
                return ctx.app.emit('error', tokenExpiredError, ctx)
        
            case 'JsonWebTokenError':
                return ctx.app.emit('error', invalidToken, ctx)
        
            default:
                break;
        }
    }
    await next()
}