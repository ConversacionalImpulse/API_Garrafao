import express from 'express'
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({message: 'Hello from the API'})
})

app.listen(4000, () => {
    console.log('API listening on port 4000')
})