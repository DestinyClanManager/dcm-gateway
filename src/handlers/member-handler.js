import rp from 'request-promise'

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
