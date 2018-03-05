import { getRemovals, addRemoval } from '../handlers/removal-handler'
import { kickMember } from '../handlers/clan-handler'

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
    let auth = req.get('Authorization')

    if (!auth) {
      res.status(401).send('Unauthorized')
      return
    }

    if (process.env.NODE_ENV === 'production') {
      try {
        await kickMember(req.params.clanId, req.body.removedMembershipId, auth)
      } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
        return
      }
    } else {
      console.log('Skipping call to Bungie.net to kick member')
    }

    try {
      removal = await addRemoval(req.params.clanId, req.body)
    } catch (error) {
      console.error(error)
      res.status(500).send(error.message)
    }

    res.status(201).json(removal)
  })
}
