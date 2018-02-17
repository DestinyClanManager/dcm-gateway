import { Router } from 'express'
import { configureClanRoutes } from './clan'
import { configureMemberRoutes } from './member'
import { configureActivityRoutes } from './activity'

const routes = Router()

routes.get('/', (req, res) => {
  res.send('alive')
})

configureClanRoutes(routes)
configureMemberRoutes(routes)
configureActivityRoutes(routes)

export default routes
