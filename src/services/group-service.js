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
