import { Router } from 'express'
import { getMembersInClan, getMemberDetails } from './handlers/member-handler'

const routes = Router()

routes.get('/', (req, res) => {
  res.send('alive')
})

routes.get('/clam/:clanId/members', (req, res) => {
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

export default routes
