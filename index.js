const express = require('express')
const app = express()
const session = require('express-session')
const flash = require('express-flash')
const port = 3000
const userGames = require('./routes/userGames')
const restrict = require('./middlewares/restrict')

app.use(express.json())

app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(session({
    secret: 'this is a secret key',
    resave: false,
    saveUninitialized: false
}))

const passport = require('./lib/passport')
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.get('/', function(request, response){
    response.render('home', {title:'The Games'});
});

app.get('/rockpaperscissors', restrict, (request, response) => {
    response.render('rockpaperscissor', {title: 'Rock Papper Scissor'});
});

const authRouter = require('./routes/auth.js')
app.use("/auth", authRouter)

const adminRouter = require('./routes/userGames')
app.use("/admin", adminRouter)

app.use((err, req, res, next) => {
    res.status(500).json({
        status : "fail",
        errors : "err.message"
    })    
})

app.use((req, res, next) => {
    res.status(404).json({
        status : "fail",
        errors : "(404) not found"
    })    
})

app.listen(port, () => {
    console.log(`Web started at port : ${port}`)
})