import { getRemovals, addRemoval, addRemovals } from '../handlers/removal-handler'
import { kickMember, kickMembers } from '../handlers/clan-handler'
import asyncErrorHandler from 'express-async-handler'

export function configureRemovalRoutes(routes) {
  routes.get(
    '/removal/:clanId',
    asyncErrorHandler(async (req, res, next) => {
      const removals = await getRemovals(req.params.clanId)
      res.json(removals)
    })
  )

  routes.post(
    '/removal/:clanId',
    asyncErrorHandler(async (req, res, next) => {
      let auth = req.get('Authorization')

      if (!auth) {
        res.status(401).send('Unauthorized')
        return
      }

      if (process.env.NODE_ENV === 'production') {
        await kickMember(req.params.clanId, req.body.removedMembershipType, req.body.removedMembershipId, auth)
      } else {
        console.log('Skipping call to Bungie.net to kick member')
      }

      const removal = await addRemoval(req.params.clanId, req.body)
      res.status(201).json(removal)
    })
  )

  routes.post(
    '/removal/:clanId/batch',
    asyncErrorHandler(async (req, res, next) => {
      let authToken = req.get('Authorization')

      if (!authToken) {
        res.status(401).send('Unauthorized')
        return
      }

      if (process.env.NODE_ENV === 'production') {
        await kickMembers(req.params.clanId, req.body, authToken)
      } else {
        console.log('Skipping call to Bungie.net to kick members')
      }

      const removals = await addRemovals(req.params.clanId, req.body)
      res.status(201).json(removals)
    })
  )
}
