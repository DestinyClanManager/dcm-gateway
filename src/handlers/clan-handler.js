import * as groupService from '../services/group-service'
import { getProfile } from '../services/destiny-service'
import sort from 'fast-sort'

export async function getMembersInClan(clanId) {
  return await groupService.getMembersOfGroup(clanId)
}

export async function getInactiveMembers(clanId) {
  let members = await groupService.getMembersOfGroup(clanId)
  let profiles = []

  for (let member in members) {
    if (members[member].destinyUserInfo) {
      let profile

      try {
        profile = await getProfile(members[member].destinyUserInfo.membershipId)
      } catch (error) {
        continue
      }

      console.log('processed member', profile.gamertag)

      profiles.push(profile)
    }
  }

  console.log('finished generating reports for', members.length, 'members')

  return sort(profiles).desc([p => p.daysSinceLastPlayed])
}

export async function kickMember(clanId, membershipId, bearerToken) {
  return await groupService.kickMemberFromGroup(clanId, membershipId, bearerToken)
}

export async function getPendingMembers(clanId, authToken) {
  return await groupService.getPendingMembersOfGroup(clanId, authToken)
}

export async function getInvitedMembers(clanId, authToken) {
  return await groupService.getInvitedMembersForGroup(clanId, authToken)
}

export async function approveMembershipRequests(clanId, memberships, authToken) {
  return await groupService.approvePendingForList(clanId, memberships, authToken)
}

export async function denyMembershipRequests(clanId, memberships, authToken) {
  return await groupService.denyPendingForList(clanId, memberships, authToken)
}

export async function rescindInvitation(clanId, membershipId, authToken) {
  return await groupService.cancelGroupInvite(clanId, membershipId, authToken)
}
