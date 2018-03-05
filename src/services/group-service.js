import rp from 'request-promise'

function createRequest(endpoint = '/', headers = {}) {
  return {
    uri: `${process.env.API_BASE_URL}/GroupV2${endpoint}`,
    headers: Object.assign({}, headers, {
      'X-API-Key': process.env.API_KEY
    }),
    json: true
  }
}

export async function getMembersOfGroup(groupId) {
  return new Promise((resolve, reject) => {
    const membersRequest = createRequest(`/${groupId}/Members`)
    rp(membersRequest)
      .then(response => {
        resolve(response.Response.results)
      })
      .catch(error => reject(error))
  })
}

export async function getMemberDetails(membershipId) {
  return new Promise((resolve, reject) => {
    const memberRequest = createRequest(`/User/254/${membershipId}/0/1/`)

    rp(memberRequest)
      .then(response => resolve(response.Response.results))
      .catch(error => reject(error))
  })
}

export async function kickMemberFromGroup(groupId, membershipId, bearerToken) {
  return new Promise((resolve, reject) => {
    const request = {
      uri: `${process.env.API_BASE_URL}/GroupV2/${groupId}/Members/1/${membershipId}/Kick/`,
      method: 'POST',
      json: true,
      headers: {
        'X-API-Key': process.env.API_KEY,
        Authorization: bearerToken
      }
    }

    rp(request)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}
