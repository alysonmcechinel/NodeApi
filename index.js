//config inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// forma de ler JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// rotas da API
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

// Rota inicial / endpoint
app.get('/', (req, res) => {
    
    //mostrar requisição
    res.json({ Message: 'Oi express!'});

})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

// entregar uma porta
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.i7wlg.mongodb.net/bancodaapi?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Conectamos ao MongoDB!!')
        app.listen(3000)
    })
    .catch((err) => console.log(err))

