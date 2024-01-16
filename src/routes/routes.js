import express from 'express'
const routes = express.Router()

import {home} from '../controllers/controller_api.js'
import { createData } from '../controllers/controller_pipefy.js';
import { CreateSheet } from '../controllers/controller_planilha.js';

routes.get('/', home)
routes.post('/formulario', createData)
routes.post('/planilha', CreateSheet)

export default routes;