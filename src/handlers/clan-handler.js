import rp from 'request-promise'
import { getMembersOfGroup, kickMemberFromGroup } from '../services/group-service'
import { getProfile } from '../services/destiny-service'
import sort from 'fast-sort'

export async function getMembersInClan(clanId) {
  return await getMembersOfGroup(clanId)
}

export async function getInactiveMembers(clanId) {
  let members = await getMembersOfGroup(clanId)
  let profiles = []

  for (let member in members) {
    if (members[member].destinyUserInfo) {
      const profile = await getProfile(members[member].destinyUserInfo.membershipId)
      console.log('processed member', profile.gamertag)

      profiles.push(profile)
    }
  }

  console.log('finished generating reports for', members.length, 'members')

  return sort(profiles).asc([p => p.daysSinceLasyPlayed])
}

export async function kickMember(clanId, membershipId, bearerToken) {
  return await kickMemberFromGroup(clanId, membershipId, bearerToken)
}
