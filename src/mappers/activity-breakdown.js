import { activityModeToName } from './activity-name'

export function makeActivityBreakdown(activities) {
  const activityBreakdown = {}

  activities.forEach(activity => {
    const activityName = activityModeToName(activity.activityDetails.mode)
    if (!activityBreakdown[activityName]) {
      activityBreakdown[activityName] = 0
    }

    activityBreakdown[activityName]++
  })

  return Object.entries(activityBreakdown).map(activity => activity)
}
