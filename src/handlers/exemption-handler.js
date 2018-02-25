import * as exemptionService from '../services/exemption-service'

export async function getExemptions(clanId) {
  return await exemptionService.getExemptionsForClan(clanId)
}

export async function createExemption(clanId, exemption) {
  return await exemptionService.createExemptionForMember(clanId, exemption)
}

export async function editExemption(clanId, exemption) {
  return await exemptionService.editExemption(clanId, exemption)
}
