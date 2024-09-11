const {createUser} = require('../../service/user.service')
const {getUserInfo} = require('../../service/user.service')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../../config/config.default')

// 校验注册账户的合法性
// function paramsVerify(user_name, password) {
//     console.log(2222);
    
//     if (!user_name || !password) {
//         return false
//     }
//     return true
// }

class UserController {
    constructor() {
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    async register(ctx, next) {
        const body = ctx.request.body
        
        // 合法性
        // if (!this.paramsVerify(body.user_name, body.password)) {
        //     ctx.body = {
        //         code: -1,
        //         message: '用户名或密码不能为空',
        //         result: ''
        //     }    
        //     return
        // }
        // // 用户是否存在
        // // console.log(userNameIsExist(body.user_name), 32);
        
        // if (await userNameIsExist(body.user_name)) {
        //     ctx.body = {
        //         code: -1,
        //         message: '用户已存在',
        //         result: ''
        //     }    
        //     return
        // }
        const res  =await createUser(body.user_name, body.password)
        ctx.body = {
            code: 0,
            message: '用户注册成功',
            result: {
                id: res.id,
                user_name: res.user_name
            }
        }
    }
    async login(ctx, next) {
        const {user_name} = ctx.request.body
        try {
            const {password, ...res} = await getUserInfo(user_name)
            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    token: jwt.sign(res, JWT_SECRET, {expiresIn: '1d'})
                }
            }
        } catch (error) {
            
        }
        // ctx.body = '登录成功'
    }
    paramsVerify(user_name, password) {
        console.log(2222);
        
        if (!user_name || !password) {
            return false
        }
        return true
    }
}

module.exports = new UserController()