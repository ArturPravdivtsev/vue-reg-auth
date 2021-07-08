const Router = require('express')
const router = new Router()
const controller = require('../controllers/')
const { check } = require('express-validator')

router.post('/registration', [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть длиннее 4 символов').isLength({ min: 4 })
], controller.registration)
router.post('/login', controller.login)
router.get('/refresh', controller.refresh)
router.get('/users', controller.getUsers)

module.exports = router