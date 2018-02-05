import rp from 'request-promise'
import { getMembersOfGroup } from '../services/group-service'
import { getProfile } from '../services/destiny-service'
import sort from 'fast-sort'

export async function getMembersInClan(clanId) {
  return await getMembersOfGroup(clanId)
}

export function getMemberDetails(membershipId) {
  return new Promise((resolve, reject) => {
    const memberRequest = {
      uri: `${process.env.API_BASE_URL}/GroupV2/User/254/${membershipId}/0/1/`,
      headers: {
        'X-API-Key': process.env.API_KEY
      },
      json: true
    }

    console.log('GetGroupsForMember:', memberRequest)

    rp(memberRequest)
      .then(response => {
        resolve(response.Response.results)
      })
      .catch(error => reject(error))
  })
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

  return sort(profiles).asc([p => p.daysSinceLasyPlayed, p => p.gamertag.toLowerCase()])
}
