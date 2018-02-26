import { getMemberCharacters } from '../services/destiny-service'
import { getMemberDetails } from '../services/group-service'

export async function getCharacters(membershipId) {
  return await getMemberCharacters(membershipId)
}

export async function getDetails(membershipId) {
  return await getMemberDetails(membershipId)
}
