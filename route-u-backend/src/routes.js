import { Router } from 'express'

import UserController from './app/controllers/UserController'

import SessionController from './app/controllers/SessionController'

//import authMiddleware from './app/mi'

const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

//routes.use(authMiddleware)

export default routes