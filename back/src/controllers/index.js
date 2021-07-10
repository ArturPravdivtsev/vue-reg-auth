const User = require('../models/')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('../../config')
const tokenModel = require('../models/token')

const generateAccessToken = (id) => {
    const payload = { id }
    return jwt.sign(payload, secret, { expiresIn: "15s" })
}

const generateRefreshToken = (id) => {
    const payload = { id }
    return jwt.sign(payload, secret, { expiresIn: "30s" })
}

const saveToken = async (userId, refreshToken) => {
    const tokenData = await tokenModel.findOne({ user: userId})
    if(tokenData) {
        tokenData.refreshToken = refreshToken
        return tokenData.save()
    }
    const token = await tokenModel.create({ user: userId, refreshToken})
    return token
}

const validateAccessToken = (token) => {
    try {
        const userData = jwt.verify(token, secret)
        return userData
    } catch (e) {
        return null
    }
}

const validateRefreshToken = (token) => {
    try {
        const userData = jwt.verify(token, secret)
        return userData
    } catch (e) {
        return null
    }
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty) {
                return res.status(400).json({ message: "Ошибка при регистрации", errors})
            }
            const {username, password } = req.body
            const candidate = await User.findOne({ username })
            if(candidate) {
                return res.status(400).json({message: 'Пользователь с таким именем уже существует!'})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const user = new User({ username, password: hashPassword})
            await user.save()
            const registredUser = await User.findOne({ username })
            const accessToken = generateAccessToken(registredUser._id)
            const refreshToken = generateRefreshToken(registredUser._id)
            await saveToken(registredUser._id, refreshToken)
            res.cookie('refreshToken', refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true })
            return res.json({ message: 'Пользователь успешно зарегистрирован', refreshToken, accessToken, registredUser})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ username })
            if(!user) {
                return res.status(400).json({ message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword) {
                return res.status(400).json({ message: 'Введен неверный пароль'})
            }
            const accessToken = generateAccessToken(user._id)
            const refreshToken = generateRefreshToken(user._id)
            await saveToken(user._id, refreshToken)
            res.cookie('refreshToken', refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true })
            return res.json({ message: 'Успешный вход', refreshToken, accessToken, user})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async refresh(req, res) {
        try {
            const { refreshToken } = req.cookies
            if(!refreshToken) {
                res.status(403).json({message: 'Unauthorized'})
            }
            const userData = validateRefreshToken(refreshToken)
            const tokenDb = await tokenModel.findOne({ refreshToken })
            if(!userData || !tokenDb) {
                return res.status(403).json({message: 'Unauthorized'})
            }
            const user = await User.findById(userData.id)
            const accessToken = generateAccessToken(user._id)
            const refreshTokenNew = generateRefreshToken(user._id)
            await saveToken(user._id, refreshTokenNew)
            res.cookie('refreshToken', refreshTokenNew, { maxAge: 30*24*60*60*1000, httpOnly: true })
            return res.json({ refreshToken: refreshTokenNew, accessToken, user })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Refresh error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            
        }
    }
}

module.exports = new authController()