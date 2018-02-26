import { getMembersInClan, getInactiveMembers } from '../handlers/clan-handler'

export function configureClanRoutes(routes) {
  routes.get('/clan/:clanId/members', async (req, res) => {
    let members

    try {
      members = await getMembersInClan(req.params.clanId)
    } catch (error) {
      console.error(error)
      res.status(500).json(new Error(error))
    }

    res.json(members)
  })

  routes.get('/clan/:clanId/activity-report', async (req, res) => {
    let inactiveMembers

    try {
      inactiveMembers = await getInactiveMembers(req.params.clanId)
    } catch (error) {
      console.error(error)
      res.status(500).send(error.message)
    }

    res.json(inactiveMembers)
  })
}
