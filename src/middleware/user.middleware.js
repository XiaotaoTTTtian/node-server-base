const {userFormateError, userAlreadyExited, userDoesNotExist, invalidPassword, userLoginError} = require('../constant/err.type')
// const {userNameIsExist} = require('../../service/user.service')
const {userNameIsExist, getUserInfo} = require('../service/user.service')
const bcrypt = require('bcryptjs')

const userValidator = async (ctx, next) => {
    const {user_name, password} = ctx.request.body
    if (!user_name || !password) {
        ctx.app.emit('error', userFormateError, ctx)
        return
    }
    await next()
}

const verifyUser = async (ctx, next) => {
    const {user_name} = ctx.request.body
    if (await userNameIsExist(user_name)) {
        ctx.app.emit('error', userAlreadyExited, ctx)
        return
    }
    await next()
}

const cryptPassword = async (ctx, next) => {
    const {password} = ctx.request.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    ctx.request.body.password = hash
    await next()
}

const verifyLogin = async (ctx, next) => {
    const {user_name, password} = ctx.request.body
    try {
        const res = await userNameIsExist(user_name)
        if (!res) {
            ctx.app.emit('error', userDoesNotExist, ctx)
            return
        }
        // 密码是否匹配
        const userInfo = await getUserInfo(user_name)
        if (!bcrypt.compareSync(password, userInfo.password)) {
            ctx.app.emit('error', invalidPassword, ctx)
            return
        }
    } catch (error) {
        console.log(error);
        
        ctx.app.emit('error', userLoginError, ctx)
        return 
    }
    await next()
}

module.exports = {
    userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin
}