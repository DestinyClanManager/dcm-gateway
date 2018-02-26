import { getCharacters, getDetails } from '../handlers/member-handler'
import { getCharacterActivity } from '../handlers/character-handler'
import { makeActivityBreakdown } from '../mappers/activity-breakdown'
import { makeActivityByDate } from '../mappers/activity-by-date'

export function configureMemberRoutes(routes) {
  routes.get('/member/:membershipId/', async (req, res) => {
    let details

    try {
      details = await getDetails(req.params.membershipId)
    } catch (error) {
      console.error(error)
      res.status(500).send(error.message)
    }

    res.json(details)
  })

  routes.get('/member/:membershipId/characters', async (req, res) => {
    let characters

    try {
      characters = await getCharacters(req.params.membershipId)
    } catch (error) {
      console.error(error)
      res.status(500).send(error.message)
    }

    res.json(characters)
  })

  routes.get('/member/:membershipId/activity/:characterId', async (req, res) => {
    let activities

    try {
      activities = await getCharacterActivity(req.params.membershipId, req.params.characterId)
    } catch (error) {
      console.error(error)
      res.status(500).send(error.message)
    }

    res.json(activities)
  })

  routes.get('/member/:membershipId/activity/recent/:characterId/activity-breakdown', async (req, res) => {
    let activities

    try {
      activities = await getCharacterActivity(req.params.membershipId, req.params.characterId)
    } catch (error) {
      console.error(error)
      res.status(500).send(error.message)
    }

    res.json(makeActivityBreakdown(activities))
  })

  routes.get('/member/:membershipId/activity/recent/:characterId/activity-by-date', async (req, res) => {
    let activities

    try {
      activities = await getCharacterActivity(req.params.membershipId, req.params.characterId)
    } catch (error) {
      console.error(error)
      res.status(500).send(error.message)
    }

    res.json(makeActivityByDate(activities))
  })
}
