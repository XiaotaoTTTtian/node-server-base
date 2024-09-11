const User = require('../model/user.model')

class UserService {
    async createUser(user_name, password) {
        console.log(user_name, password);
        const res = await User.create({user_name, password})
        return res.dataValues
    }
    async userNameIsExist(user_name) {
        const users = await User.findAll()
        const result = JSON.parse(JSON.stringify(users, null, 2)).find(item => item.user_name === user_name)
        return !!result
    }
    async getUserInfo(user_name) {
        const users = await User.findAll()
        const result = JSON.parse(JSON.stringify(users, null, 2)).find(item => item.user_name === user_name)
        return result
    }
}

module.exports = new UserService()