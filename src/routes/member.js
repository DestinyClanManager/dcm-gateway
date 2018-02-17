import { getMemberProfile, getMemberDetails } from '../handlers/member-handler'
import { getCharacterActivity } from '../handlers/character-handler'
import { makeActivityBreakdown } from '../mappers/activity-breakdown'
import { makeActivityByDate } from '../mappers/activity-by-date'

export function configureMemberRoutes(routes) {
  routes.get('/member/:membershipId/', (req, res) => {
    getMemberDetails(req.params.membershipId)
      .then(groups => {
        res.json(groups)
      })
      .catch(error => {
        console.error(error)
        res.status(500).json({
          error: error
        })
      })
  })

  routes.get('/member/:membershipId/characters', (req, res) => {
    getMemberProfile(req.params.membershipId)
      .then(characters => {
        res.json(characters)
      })
      .catch(error => {
        console.error(error)
        res.status(500).send(error.message)
      })
  })

  routes.get('/member/:membershipId/activity/:characterId', (req, res) => {
    getCharacterActivity(req.params.membershipId, req.params.characterId)
      .then(response => {
        res.json(response.Response.activities)
      })
      .catch(error => {
        console.error(error)
        res.status(500).send(error.message)
      })
  })

  routes.get('/member/:membershipId/activity/recent/:characterId/activity-breakdown', (req, res) => {
    getCharacterActivity(req.params.membershipId, req.params.characterId)
      .then(response => {
        res.json(makeActivityBreakdown(response.Response.activities))
      })
      .catch(error => {
        console.error(error)
        res.status(500).send(error.message)
      })
  })

  routes.get('/member/:membershipId/activity/recent/:characterId/activity-by-date', (req, res) => {
    getCharacterActivity(req.params.membershipId, req.params.characterId)
      .then(response => {
        res.json(makeActivityByDate(response.Response.activities))
      })
      .catch(error => {
        console.error(error)
        res.status(500).send(error.message)
      })
  })
}
