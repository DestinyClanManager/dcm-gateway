import { getMemberCharacters, getProfile, getHistoricalStats } from '../services/destiny-service'
import * as groupService from '../services/group-service'
import * as registryService from '../services/registry-service'
import * as activityService from '../services/activity-service'
import * as activityOverviewMapper from '../mappers/activity-overview'

const expansionsMap = {
  1: 'Destiny 2',
  2: 'Curse of Osiris',
  3: 'Warmind',
  4: 'Forsaken',
  5: 'Black Armory',
  6: `Joker's Wild`,
  7: 'Penumbra'
}

export async function getCharacters(membershipType, membershipId) {
  return await getMemberCharacters(membershipType, membershipId)
}

export async function getDetails(membershipId) {
  return await groupService.getMemberDetails(membershipId)
}

export async function getAdminStatus(membershipId) {
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

    for (let profile of adminOfGroups) {
      if (!registeredClans.includes(profile.groupId)) {
        await registryService.registerClan(profile.groupId)
        await activityService.startActivityReport(profile.groupId)
      }
    }
  }

  return adminOfGroups
}

export async function getExpansions(membershipType, membershipId) {
  const profile = await getProfile(membershipType, membershipId)
  const expansions = []

  for (let i = 1; i <= profile.data.versionsOwned; i++) {
    if (expansionsMap[i]) {
      expansions.push(expansionsMap[i])
    }
  }

  return expansions
}

export async function getActivityOverview(membershipType, membershipId) {
  const historicalStats = await getHistoricalStats(membershipType, membershipId)
  return activityOverviewMapper.map(historicalStats)
}
