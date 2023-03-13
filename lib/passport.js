const passport = require('passport')
const localStrategy = require ('passport-local').Strategy
const {Strategy: JwtStrategy, ExtractJwt} =require('passport-jwt')
const{UserGame} = require('../models')

async function authenticate(username, password, done) {
    try{
        const userGames = await UserGame.authenticate({username, password})

        return done(null, userGames)
    }catch(e){
        return done (null, false, {
            message: err
        })
    }
}

passport.use(
    new localStrategy({usernameField: 'username', passwordField: 'password'}, authenticate)
)

passport.serializeUser(
    (userGames, done) => done(null, userGames.id)
)

passport.deserializeUser(
    async (id, done) => done(null, await UserGame.findByPk(id))
)

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: 'this is a secret key'
}

passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try{
            const userGames = await UserGame.findByPk(payload.id)
            done(null, userGames)
        }catch(e){
            done(err, false)
        }
        
    })
)

module.exports = passport