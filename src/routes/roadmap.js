import asyncErrorHandler from 'express-async-handler'
import { getRoadmap, addSuggestion } from '../handlers/roadmap-handler'

export function configureRoadmapRoutes(routes) {
  routes.get(
    '/roadmap',
    asyncErrorHandler(async (req, res, next) => {
      const roadmap = await getRoadmap()
      res.json(roadmap)
    })
  )

  routes.post(
    '/roadmap/suggestion',
    asyncErrorHandler(async (req, res, next) => {
      const suggestion = req.body
      const response = await addSuggestion(suggestion)
      res.json(response)
    })
  )
}
