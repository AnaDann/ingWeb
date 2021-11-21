const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser') 

const app = express()

//Seteamos el motor de plantillas
app.set('view engine','ejs')

//Seteamos la carpeta public para archivos estáticos
app.use(express.static('public'))

//Para procesar datos enviados desde forms
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Seteamos las variables de entorno
dotenv.config({path: './env/.env'})

//Para poder trabajar con las cookies
app.use(cookieParser())


//Llamar al router
app.use('/', require('./routers/router'))

//Para eliminar la cache 
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

/*app.get('/',(req,res)=>{
    res.render('index')
})*/

app.listen(3000,()=>{
    console.log('SERVER UP runnung in http://localhost:3000')
})

