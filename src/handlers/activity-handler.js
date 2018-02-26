import { getPostGameCarnage } from '../services/destiny-service'

export async function getPostGameCarnageReport(activityId) {
  return await getPostGameCarnage(activityId)
}
