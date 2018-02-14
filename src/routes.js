import { Router } from 'express'
import { getMembersInClan, getMemberDetails, getInactiveMembers } from './handlers/clan-handler'
import { getMemberProfile } from './handlers/member-handler'
import { getCharacterActivity } from './handlers/character-handler'
import { getPostGameCarnageReport } from './handlers/activity-handler'

const routes = Router()

routes.get('/', (req, res) => {
  res.send('alive')
})

routes.get('/clan/:clanId/members', (req, res) => {
  getMembersInClan(req.params.clanId)
    .then(members => {
      res.json(members)
    })
    .catch(error => {
      res.status(500).json(new Error(error))
    })
})

routes.get('/clan/:clanId/activity-report', (req, res) => {
  getInactiveMembers(req.params.clanId)
    .then(inactiveMembers => {
      res.json(inactiveMembers)
    })
    .catch(error => {
      console.error(error)
      res.status(500).send(error.message)
    })
})

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

routes.get('/activity/:activityId', (req, res) => {
  getPostGameCarnageReport(req.params.activityId)
    .then(activityReport => {
      res.json(activityReport)
    })
    .catch(error => {
      console.error(error)
      res.status(500).send(error.message)
    })
})

export default routes
