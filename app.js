const dotenv = require('dotenv')

//Load Config
dotenv.config({path: './config/config.env'})

const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const methodOverride = require('method-override')
const passport = require('passport')
const exphbs = require('express-handlebars')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const connectDB = require('./config/connectDB')

//Passing pasport as a arguement
require('./config/passport')(passport)


const app = express()

//Body-Parser Middleware

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//Method override Middleware
app.use(methodOverride(function (req, res) {
   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
     // look in urlencoded POST bodies and delete it
     let method = req.body._method
     delete req.body._method
     return method
   }
 }))

const PORT = process.env.PORT || 3000

//Call connection to Db
connectDB()

//Helps shows http method or response on the terminal
if(process.env.NODE_ENV === 'development'){
   app.use(morgan('dev'))
}

//Handlebars  Helpers
const {formatDate, stripTags, truncate, editIcon, select} =require('./helpers/hbs')

//Express-handlebars Middleware
app.engine('.hbs', exphbs.engine({
   helpers: {
   formatDate,
   stripTags,
   truncate,
   editIcon,
   select
},
defaultLayout: 'main',
extname: '.hbs',
runtimeOptions:{allowProtoPropertiesByDefault:true,
   allowedProtoMethodsByDefault:true}
}))
app.set('view engine', '.hbs')

//session Middle
app.use(session({
   secret: 'keyboard cat',
   resave: false,
   saveUninitialized: false,
   //ensures that we stay logged in even after refreshinng during develpment
   store:MongoStore.create({mongoUrl:process.env.MONGODB_URI})
}))

//Static Folder
app.use(express.static('public'))

//passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//Set Global Variable
app.use((req, res, next) => {
   res.locals.user = req.user || null
   next()
})

//Routes
app.use('/', require('./routes/indexRoutes'))
app.use('/auth', require('./routes/authRoute'))
app.use('/stories', require('./routes/storiesRoute'))


mongoose.connection.once('open', () => {
   console.log(`Connected to Database`)
   app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} and localhost http://localhost:${PORT}`))
})
