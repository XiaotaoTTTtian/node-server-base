const {DataTypes} = require('sequelize')

const seq = require('../db/seq')

const User = seq.define('user1', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名唯一'
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是否为管理员，0：不是管理员；1：是管理员'
    }
})
User.sync()
module.exports = User