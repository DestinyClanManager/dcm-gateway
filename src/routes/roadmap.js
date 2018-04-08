import asyncErrorHandler from 'express-async-handler'
import { getRoadmap } from '../handlers/roadmap-handler'

export function configureRoadmapRoutes(routes) {
  routes.get(
    '/roadmap',
    asyncErrorHandler(async (req, res, next) => {
      const roadmap = await getRoadmap()
      res.json(roadmap)
    })
  )
}
