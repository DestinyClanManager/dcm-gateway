import rp from 'request-promise'

export function getMembersInClan(clanId) {
  return new Promise((resolve, reject) => {
    const membersRequest = {
      uri: `${process.env.API_BASE_URL}/GroupV2/${clanId}/Members/`,
      headers: {
        'X-API-Key': process.env.API_KEY
      },
      json: true
    }

    rp(membersRequest)
      .then(response => {
        resolve(response.Response.results)
      })
      .catch(error => {
        reject(error)
      })
  })
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
