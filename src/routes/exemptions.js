import { getExemptions, createExemption, editExemption } from '../handlers/exemption-handler'

export function configureExemptionsRoutes(routes) {
  routes.get('/exemptions/:clanId', async (req, res) => {
    let exemptions

    console.log(req.params)

    try {
      exemptions = await getExemptions(req.params.clanId)
    } catch (error) {
      console.error(error)
      res.status(500).send(error.message)
    }

    res.json(exemptions)
  })

  routes.post('/exemptions/:clanId', async (req, res) => {
    let exemption

    try {
      exemption = await createExemption(req.params.clanId, req.body)
    } catch (error) {
      console.error(error)
      res.status(500).send(error.message)
    }

    res.json(exemption)
  })

  routes.put('/exemptions/:clanId/:membershipId', async (req, res) => {
    let exemption

    try {
      exemption = await editExemption(req.params.clanId, req.body)
    } catch (error) {
      console.error(error)
      res.status(500).send(error.message)
    }

    res.json(exemption)
  })
}
