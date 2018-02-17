import rp from 'request-promise'

export function getMemberProfile(membershipIo) {
  return new Promise((resolve, reject) => {
    const profileRequest = {
      uri: `${process.env.API_BASE_URL}/Destiny2/1/Profile/${membershipIo}?components=200`,
      headers: {
        'X-API-Key': process.env.API_KEY
      },
      json: true
    }
    console.log('profile request', profileRequest)
    rp(profileRequest)
      .then(response => {
        if (response.ErrorStatus !== 'Success') {
          console.log('Non succcess response', response)
          reject(new Error(response.Message))
        }

        const characters = []
        try {
          Object.values(response.Response.characters.data).forEach(character => characters.push(character))
        } catch (e) {
          reject(e)
        }
        resolve(characters)
      })
      .catch(error => reject(error))
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

    rp(memberRequest)
      .then(response => {
        resolve(response.Response.results)
      })
      .catch(error => reject(error))
  })
}
