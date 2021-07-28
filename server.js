const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const config = require('config')
const morgan = require('morgan')

//router
const register = require('./router/register')
const login = require('./router/login')
const post = require('./router/post')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(morgan('dev'))


app.use('/api',register)
app.use('/api',login)
app.use('/api',post)

// app.get('*',(req,res)=>{
//     res.send('twitter')
// })


mongoose.connect(config.get('mongoURL'),{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('db conneted'))
.catch(err=>console.log(err))

const PORT = config.get('PORT') || 9000;
const server = app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})

process.on('unhandledRejection',(err)=>{
    console.log(err)
    server.close(process.exit(1))
})
