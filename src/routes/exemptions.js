import { getExemptions, createExemption, editExemption } from '../handlers/exemption-handler'
import asyncErrorHandler from 'express-async-handler'

export function configureExemptionsRoutes(routes) {
  routes.get(
    '/exemptions/:clanId',
    asyncErrorHandler(async (req, res, next) => {
      const exemptions = await getExemptions(req.params.clanId)
      res.json(exemptions)
    })
  )

  routes.post(
    '/exemptions/:clanId',
    asyncErrorHandler(async (req, res, next) => {
      const exemption = await createExemption(req.params.clanId, req.body)
      res.json(exemption)
    })
  )

  routes.put(
    '/exemptions/:clanId/:membershipId',
    asyncErrorHandler(async (req, res, next) => {
      const exemption = await editExemption(req.params.clanId, req.body)
      res.json(exemption)
    })
  )
}
