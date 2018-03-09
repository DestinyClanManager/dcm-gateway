import { getPostGameCarnageReport } from '../handlers/activity-handler'
import asyncErrorHandler from 'express-async-handler'

export function configureActivityRoutes(routes) {
  routes.get(
    '/activity/:activityId',
    asyncErrorHandler(async (req, res, next) => {
      const activityReport = await getPostGameCarnageReport(req.params.activityId)
      res.json(activityReport)
    })
  )
}
