import rp from 'request-promise'

export async function createClanRequirement(requirement) {
  const request = {
    uri: `${process.env.REQUIREMENTS_BASE_URL}`,
    method: 'POST',
    body: requirement,
    json: true
  }

  return await rp(request)
}

export async function getClanRequirementsByClanId(clanId) {
  const request = {
    uri: `${process.env.REQUIREMENTS_BASE_URL}/?clanId=${clanId}`,
    method: 'GET',
    json: true
  }

  return await rp(request)
}

export async function deleteClanRequirement(clanId, requirementId) {
  const request = {
    uri: `${process.env.REQUIREMENTS_BASE_URL}/${requirementId}?clanId=${clanId}`,
    method: 'DELETE',
    json: true
  }

  return await rp(request)
}
