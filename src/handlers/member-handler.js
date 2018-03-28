import { getMemberCharacters } from '../services/destiny-service'
import * as groupService from '../services/group-service'
import * as registryService from '../services/registry-service'

export async function getCharacters(membershipId) {
  return await getMemberCharacters(membershipId)
}

export async function getDetails(membershipId) {
  return await groupService.getMemberDetails(membershipId)
}

export async function getAdminStatus(membershipType, membershipId) {
  const groups = await groupService.getMemberDetails(membershipId)
  const adminOfGroups = []

  groups.forEach(result => {
    const profile = {
      bungieNetUserInfo: {
        membershipType: result.member.bungieNetUserInfo.membershipType,
        membershipId: result.member.bungieNetUserInfo.membershipId,
        displayName: result.member.bungieNetUserInfo.displayName
      },
      platformUserInfo: {
        membershipType: result.member.destinyUserInfo.membershipType,
        membershipId: result.member.destinyUserInfo.membershipId,
        displayName: result.member.destinyUserInfo.displayName
      },
      groupId: result.group.groupId,
      groupName: result.group.name,
      isAdmin: result.member.memberType > 2,
      memberType: result.member.memberType
    }

    if (profile.isAdmin) {
      adminOfGroups.push(profile)
    }
  })

  if (adminOfGroups.length > 0) {
    const registeredClans = await registryService.getRegisteredClans()

    for (let index in adminOfGroups) {
      const profile = adminOfGroups[index]

      if (!registeredClans.includes(profile.groupId)) {
        await registryService.registerClan(profile.groupId)
      }
    }
  }

  return adminOfGroups
}
