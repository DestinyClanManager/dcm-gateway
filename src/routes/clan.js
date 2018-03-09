import asyncErrorHandler from 'express-async-handler'
import * as clanHandler from '../handlers/clan-handler'

export function configureClanRoutes(routes) {
  routes.get(
    '/clan/:clanId/members',
    asyncErrorHandler(async (req, res, next) => {
      const members = await clanHandler.getMembersInClan(req.params.clanId)
      res.json(members)
    })
  )

  routes.get(
    '/clan/:clanId/activity-report',
    asyncErrorHandler(async (req, res, next) => {
      const inactiveMembers = await clanHandler.getInactiveMembers(req.params.clanId)
      res.json(inactiveMembers)
    })
  )

  routes.get(
    '/clan/:clanId/members/pending',
    asyncErrorHandler(async (req, res, next) => {
      const authToken = req.get('Authorization')

      if (!authToken) {
        res.status(401).send('Unauthorized')
      }

      const pendingMembers = await clanHandler.getPendingMembers(req.params.clanId, authToken)
      res.json(pendingMembers)
    })
  )

  routes.get(
    '/clan/:clanId/members/invited',
    asyncErrorHandler(async (req, res, next) => {
      const authToken = req.get('Authorization')

      if (!authToken) {
        res.status(401).send('Unauthorized')
      }

      const invitedMembers = await clanHandler.getInvitedMembers(req.params.clanId, authToken)
      res.json(invitedMembers)
    })
  )

  routes.post(
    '/clan/:clanId/members/pending/approve',
    asyncErrorHandler(async (req, res, next) => {
      const authToken = req.get('Authorization')

      if (!authToken) {
        res.status(401).send('Unauthorized')
      }

      const response = await clanHandler.approveMembershipRequests(req.params.clanId, req.body, authToken)
      res.json(response)
    })
  )

  routes.post(
    '/clan/:clanId/members/pending/deny',
    asyncErrorHandler(async (req, res, next) => {
      const authToken = req.get('Authorization')

      if (!authToken) {
        res.status(401).send('Unauthorized')
      }

      const response = await clanHandler.denyMembershipRequests(req.params.clanId, req.body, authToken)
      res.json(response)
    })
  )

  routes.post(
    '/clan/:clanId/members/invited/rescind/:membershipId',
    asyncErrorHandler(async (req, res, next) => {
      const authToken = req.get('Authorization')

      if (!authToken) {
        res.status(401).send('Unauthorized')
      }

      const { clanId, membershipId } = req.params
      const response = await clanHandler.rescindInvitation(clanId, membershipId, authToken)
      res.json(response)
    })
  )
}
