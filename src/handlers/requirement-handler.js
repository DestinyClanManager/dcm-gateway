import * as requirementService from '../services/requirement-service'

export async function createRequirementForClan(clanId, requirement) {
  requirement.clanId = clanId
  return await requirementService.createClanRequirement(requirement)
}

export async function getRequirementsForClan(clanId) {
  return await requirementService.getClanRequirementsByClanId(clanId)
}

export async function deleteClanRequirement(clanId, requirementId) {
  return await requirementService.deleteClanRequirement(clanId, requirementId)
}
