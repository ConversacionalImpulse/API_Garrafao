import express from 'express'
const routes = express.Router()

import {home} from '../controllers/controller_api.js'
import { createData } from '../controllers/controller_pipefy.js';

routes.get('/', home)
routes.post('/formulario', createData)

export default routes;