const express = require('express')
const router = express.Router()
const authControllers = require('../controllers/authControllers')
const restrict = require('../middlewares/restrict')

router.get('/login', authControllers.loginPage)
router.post('/login', authControllers.login)
router.get('/loginAs', restrict, authControllers.loginAs)
router.get('/register', authControllers.registerPage)
router.post('/register', authControllers.register)
router.get('/register-biodata', authControllers.registerBiodataPage)
router.post('/register-biodata', authControllers.registerBiodata)

router.post('/jsonlogin', authControllers.jsonLogin)
router.get('/whoami', restrict, authControllers.whoami)

module.exports = router
