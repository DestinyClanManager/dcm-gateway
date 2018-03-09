import asyncHandler from 'express-async-handler'
import * as clanHandler from '../handlers/clan-handler'

export function configureClanRoutes(routes) {
  routes.get(
    '/clan/:clanId/members',
    asyncHandler(async (req, res, next) => {
      const members = await clanHandler.getMembersInClan(req.params.clanId)
      res.json(members)
    })
  )

  routes.get('/clan/:clanId/activity-report', async (req, res) => {
    let inactiveMembers

    try {
      inactiveMembers = await clanHandler.getInactiveMembers(req.params.clanId)
    } catch (error) {
      console.error(error)
      res.status(500).send(error.message)
    }

    res.json(inactiveMembers)
  })

  routes.get('/clan/:clanId/members/pending', async (req, res) => {
    let pendingMembers
    const authToken = req.get('Authorization')

    if (!authToken) {
      res.status(401).send('Unauthorized')
    }

    try {
      pendingMembers = await clanHandler.getPendingMembers(
        req.params.clanId,
        authToken
      )
    } catch (error) {
      console.error(error)
      res.status(error.statusCode || 500).send(error.message)
    }

    res.json(pendingMembers)
  })

  routes.get('/clan/:clanId/members/invited', async (req, res) => {
    let invitedMembers
    const authToken = req.get('Authorization')

    try {
      invitedMembers = await clanHandler.getInvitedMembers(
        req.params.clanId,
        authToken
      )
    } catch (error) {
      console.error(error)
      res.status(error.statusCode || 500).send(error.message)
    }

    res.json(invitedMembers)
  })

  routes.post('/clan/:clanId/members/pending/approve', async (req, res) => {
    let response
    const authToken = req.get('Authorization')

    try {
      response = await clanHandler.approveMembershipRequests(
        req.params.clanId,
        req.body,
        authToken
      )
    } catch (error) {
      console.error(error)
      res.status(error.statusCode || 500).send(error.message)
    }

    res.json(response)
  })

  routes.post('/clan/:clanId/members/pending/deny', async (req, res) => {
    let response
    const authToken = req.get('Authorization')

    try {
      response = await clanHandler.denyMembershipRequests(
        req.params.clanId,
        req.body,
        authToken
      )
    } catch (error) {
      console.error(error)
      res.status(error.statusCode || 500).send(error.message)
    }

    res.json(response)
  })

  routes.post(
    '/clan/:clanId/members/invited/rescind/:membershipId',
    asyncHandler(async (req, res, next) => {
      let response
      const authToken = req.get('Authorization')
      const { clanId, membershipId } = req.params

      console.log(
        `ROUTE--> canceling invitation to group ${clanId} for member ${membershipId}`
      )

      response = await clanHandler.rescindInvitation(
        clanId,
        membershipId,
        authToken
      )
      res.json(response)
    })
  )
}
