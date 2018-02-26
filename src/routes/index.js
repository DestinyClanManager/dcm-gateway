import { Router } from 'express'
import { configureClanRoutes } from './clan'
import { configureMemberRoutes } from './member'
import { configureActivityRoutes } from './activity'
import { configureExemptionsRoutes } from './exemptions'
import { configureRemovalRoutes } from './removal'

const routes = Router()

routes.get('/', (req, res) => {
  res.send('alive')
})

configureClanRoutes(routes)
configureMemberRoutes(routes)
configureActivityRoutes(routes)
configureExemptionsRoutes(routes)
configureRemovalRoutes(routes)

export default routes
