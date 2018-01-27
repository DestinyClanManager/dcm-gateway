import { Router } from 'express'
import { getMemberDetails } from './handlers/member-handler'

const routes = Router()

routes.get('/', (req, res) => {
  res.send('alive')
})

routes.get('/member/:membershipId/', (req, res) => {
  console.log(req.params)
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
