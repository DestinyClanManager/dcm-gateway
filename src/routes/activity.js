import { getPostGameCarnageReport } from '../handlers/activity-handler'

export function configureActivityRoutes(routes) {
  routes.get('/activity/:activityId', async (req, res) => {
    let activityReport

    try {
      activityReport = await getPostGameCarnageReport(req.params.activityId)
    } catch (error) {
      console.error(error)
      res.status(500).send(error.message)
    }

    res.json(activityReport)
  })
}
