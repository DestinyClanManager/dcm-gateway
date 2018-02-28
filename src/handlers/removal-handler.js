import { getRemovalsForClan, addRemovalForClan } from '../services/removal-service'

export async function getRemovals(clanId) {
  return await getRemovalsForClan(clanId)
}

export async function addRemoval(clanId, removal) {
  return await addRemovalForClan(clanId, removal)
}
