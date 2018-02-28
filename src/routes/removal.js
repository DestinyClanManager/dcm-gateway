import { getRemovals, addRemoval } from '../handlers/removal-handler'

export function configureRemovalRoutes(routes) {
  routes.get('/removal/:clanId', async (req, res) => {
    let removals

    try {
      removals = await getRemovals(req.params.clanId)
    } catch (error) {
      console.error(error)
      res.status(500).send(error.message)
    }

    res.json(removals)
  })

  routes.post('/removal/:clanId', async (req, res) => {
    let removal

    try {
      removal = await addRemoval(req.params.clanId, req.body)
    } catch (error) {
      console.error(error)
      res.status(500).send(error.message)
    }

    res.status(201).json(removal)
  })
}
