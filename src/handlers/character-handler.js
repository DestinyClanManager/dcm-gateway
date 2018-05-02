import * as destinyService from '../services/destiny-service'

export async function getCharacterActivity(membershipType, membershipId, characterId) {
  return await destinyService.getMemberCharacterActivity(membershipType, membershipId, characterId)
}
