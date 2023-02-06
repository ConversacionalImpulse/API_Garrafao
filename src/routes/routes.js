import express from 'express'
const routes = express.Router()

routes.get('/', (req, res) => {
    res.json({message: 'Hello from the API'})
})

routes.post('/formulario', (req, res) => {
    console.log(req.body)
    res.end()
})

export default routes;