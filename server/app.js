import express from 'express'
// import bodyParser from 'body-parser'
import formidable from 'express-formidable'
import path from 'path'
import { question, auth } from './routes'

const app = express()

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true}))

app.use(formidable({ encoding: 'utf-8', keepExtensions: true}))

if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
        next()
    })
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(process.cwd(), 'dist')))
}

app.use('/api/questions' , question)
app.use('/api/auth', auth)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dist/index.html'))
})

export default app