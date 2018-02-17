import { getPostGameCarnageReport } from '../handlers/activity-handler'

export function configureActivityRoutes(routes) {
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
}
