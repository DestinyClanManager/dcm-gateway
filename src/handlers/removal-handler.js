import { getRemovalsForClan } from '../services/removal-service'

export async function getRemovals(clanId) {
  return await getRemovalsForClan(clanId)
}
