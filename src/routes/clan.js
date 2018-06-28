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
    '/clan/:clanId/members/invited/rescind/:membershipType/:membershipId',
    asyncErrorHandler(async (req, res, next) => {
      const authToken = req.get('Authorization')

      if (!authToken) {
        res.status(401).send('Unauthorized')
      }

      const { clanId, membershipId, membershipType } = req.params
      const response = await clanHandler.rescindInvitation(clanId, membershipType, membershipId, authToken)
      res.json(response)
    })
  )

  routes.get(
    '/clan/:clanId/members/banned',
    asyncErrorHandler(async (req, res, next) => {
      const authToken = req.get('Authorization')

      if (!authToken) {
        res.status(401).send('Unauthorized')
      }

      const bannedMembers = await clanHandler.getBannedMembers(req.params.clanId, authToken)
      res.json(bannedMembers)
    })
  )

  routes.post(
    '/clan/:clanId/members/:membershipId/note',
    asyncErrorHandler(async (req, res, next) => {
      const { clanId, membershipId } = req.params
      const createdNote = await clanHandler.addNoteForMember(clanId, membershipId, req.body)
      res.json(createdNote)
    })
  )

  routes.get(
    '/clan/:clanId/members/:membershipId/note',
    asyncErrorHandler(async (req, res, next) => {
      const { clanId, membershipId } = req.params
      const notes = await clanHandler.getNotesForMember(clanId, membershipId)
      res.json(notes)
    })
  )

  routes.put(
    '/clan/:clanId/members/member-type',
    asyncErrorHandler(async (req, res, next) => {
      const authToken = req.get('Authorization')

      if (!authToken) {
        res.status(401).send('Unauthorized')
      }

      await clanHandler.changeMemberType(req.params.clanId, req.body, authToken)

      res.status(200).send('Ok')
    })
  )

  routes.post(
    '/clan/:clanId/members/invite',
    asyncErrorHandler(async (req, res, next) => {
      const authToken = req.get('Authorization')

      if (!authToken) {
        res.status(401).send('Unauthorized')
      }

      const { message, membership } = req.body
      const response = await clanHandler.invite(req.params.clanId, membership, message, authToken)

      res.json(response)
    })
  )

  routes.post(
    '/clan/:clanId/members/unban',
    asyncErrorHandler(async (req, res, next) => {
      const authToken = req.get('Authorization')

      if (!authToken) {
        res.status(401).send('Unauthorized')
      }

      const response = await clanHandler.unbanMember(req.params.clanId, req.body, authToken)
    })
  )
}
