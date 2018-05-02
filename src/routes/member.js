import { getCharacters, getDetails, getAdminStatus } from '../handlers/member-handler'
import { getCharacterActivity } from '../handlers/character-handler'
import { makeActivityBreakdown } from '../mappers/activity-breakdown'
import { makeActivityByDate } from '../mappers/activity-by-date'
import asyncErrorHandler from 'express-async-handler'

export function configureMemberRoutes(routes) {
  routes.get(
    '/member/:membershipId/',
    asyncErrorHandler(async (req, res, next) => {
      const details = await getDetails(req.params.membershipId)
      res.json(details)
    })
  )

  routes.get(
    '/member/:membershipType/:membershipId/admin-groups',
    asyncErrorHandler(async (req, res, next) => {
      const { membershipType, membershipId } = req.params
      const groups = await getAdminStatus(membershipType, membershipId)
      res.json(groups)
    })
  )

  routes.get(
    '/member/:membershipType/:membershipId/characters',
    asyncErrorHandler(async (req, res, next) => {
      const characters = await getCharacters(req.params.membershipType, req.params.membershipId)
      res.json(characters)
    })
  )

  routes.get(
    '/member/:membershipType/:membershipId/activity/:characterId',
    asyncErrorHandler(async (req, res, next) => {
      const activities = await getCharacterActivity(req.params.membershipType, req.params.membershipId, req.params.characterId)
      res.json(activities)
    })
  )

  routes.get(
    '/member/:membershipType/:membershipId/activity/recent/:characterId/activity-breakdown',
    asyncErrorHandler(async (req, res, next) => {
      const activities = await getCharacterActivity(req.params.membershipType, req.params.membershipId, req.params.characterId)
      res.json(makeActivityBreakdown(activities))
    })
  )

  routes.get(
    '/member/:membershipType/:membershipId/activity/recent/:characterId/activity-by-date',
    asyncErrorHandler(async (req, res, next) => {
      const activities = await getCharacterActivity(req.params.membershipType, req.params.membershipId, req.params.characterId)
      res.json(makeActivityByDate(activities))
    })
  )
}
