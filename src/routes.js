import { Router } from 'express'
import { getMembersInClan, getMemberDetails } from './handlers/clan-handler'
import { getMemberProfile } from './handlers/member-handler'

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
      res.status(500).json(error)
    })
})

routes.get('/member/:membershipId/', (req, res) => {
  getMemberDetails(req.params.membershipId)
    .then(groups => {
      res.json(groups)
    })
    .catch(error => {
      console.error(error)
      res.status(500).json(error)
    })
})

routes.get('/member/:membershipId/characters', (req, res) => {
  getMemberProfile(req.params.membershipId)
    .then(characters => {
      res.json(characters)
    })
    .catch(error => {
      console.error(error)
      res.status(500).json(error)
    })
})

export default routes
