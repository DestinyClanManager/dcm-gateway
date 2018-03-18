import * as destinyService from '../services/destiny-service'

export async function getCharacterActivity(membershipId, characterId) {
  return await destinyService.getMemberCharacterActivity(membershipId, characterId)
}
