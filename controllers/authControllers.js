const {UserGame} = require('../models')
const {UserGameBiodata} = require('../models')
const passport = require('../lib/passport')

function format(userGames){
    const {id, username} = userGames
    
    return {
        id,
        username,
        accessToken: userGames.generateToken()
    }
}

module.exports = {
    loginPage: (request, response) => {
        response.render('login', {status:'', title:'Login'})
    },
    login: passport.authenticate('local', {
        successRedirect: '/auth/loginAs',
        failureRedirect: '/auth/login',
        failureFlash: true
    }),
    loginAs: (req,res) => {
        res.render('login-as', {title:'Login As', name: req.user.username})
    },
    registerPage: (request, response) => {
        response.render('register', {title:'Register'})
    },
    register: async(req, res, next) => {
        const userGames = await UserGame.register(req.body)
        .then(userGames => {
            res.redirect('/auth/register-biodata')
        }).catch(err => {
            next(err)
        })
    },
    registerBiodataPage: (request, response) => {
        response.render('register-biodata', {title:'Register'})
    },
    registerBiodata: async(req, res) => {
        const userGamesBiodata = await UserGameBiodata.create({
            full_name: req.body.full_name,
            birth_date: req.body.birth_date,
            gender: req.body.gender,
            id_user_game: req.body.user_game_id
        })
        .then(userGamesBiodata => {
            res.status(201).redirect('/auth/login')
        })
    },
    jsonLogin: async (req, res) => {
            try{
                const userGames = await UserGame.authenticate(req.body)
            res.json(format(userGames))
            }catch(e){
                res.status(403).json({
                    message: 'Login Failed'
                })
            }
        },
    whoami: (req, res) => {
        res.json({
            data: req.user
        })
}
}