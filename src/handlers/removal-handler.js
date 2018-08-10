import { getRemovalsForClan, addRemovalForClan, addRemovalsForClan } from '../services/removal-service'

export async function getRemovals(clanId) {
  return await getRemovalsForClan(clanId)
}

export async function addRemoval(clanId, removal) {
  return await addRemovalForClan(clanId, removal)
}

export async function addRemovals(clanId, removals) {
  return await addRemovalsForClan(clanId, removals)
}
