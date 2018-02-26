import { getMemberCharacterActivity } from '../services/destiny-service'

export async function getCharacterActivity(membershipId, characterId) {
  return await getMemberCharacterActivity(membershipId, characterId)
}
