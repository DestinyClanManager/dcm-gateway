import { getMembersInClan, getInactiveMembers } from '../handlers/clan-handler'

export function configureClanRoutes(routes) {
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
}
