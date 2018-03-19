import rp from 'request-promise'

function createRequest(endpoint = '/', headers = {}) {
  return {
    uri: `${process.env.API_BASE_URL}/Destiny2${endpoint}`,
    headers: Object.assign({}, headers, {
      'X-API-Key': process.env.API_KEY
    }),
    json: true
  }
}

function createExpansionsArray(versionsOwnedEnum) {
  const expansions = []

  switch (versionsOwnedEnum) {
    case 1:
      expansions.push('Destiny 2')
      break
    case 2:
      expansions.push('Destiny 2')
      expansions.push('Curse of Osiris')
      break
    case 3:
      expansions.push('Destiny 2')
      expansions.push('Curse of Osiris')
      expansions.push('DLC2')
      break
  }

  return expansions
}

function numberOfDaysBetween(d1, d2) {
  var diff = Math.abs(d1.getTime() - d2.getTime())
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export async function getProfile(membershipId) {
  return new Promise((resolve, reject) => {
    const profileRequest = createRequest(`/1/Profile/${membershipId}?components=100`)
    rp(profileRequest)
      .then(response => {
        if (response.ErrorStatus === 'DestinyAccountNotFound') {
          const error = new Error('Not found')
          error.status = 404
          reject(error)
          return
        }

        const profile = {
          membershipId: response.Response.profile.data.userInfo.membershipId,
          gamertag: response.Response.profile.data.userInfo.displayName,
          dateLastPlayed: response.Response.profile.data.dateLastPlayed,
          expansions: createExpansionsArray(response.Response.profile.data.versionsOwned),
          characterIds: response.Response.profile.data.characterIds
        }

        profile.daysSinceLastPlayed = numberOfDaysBetween(new Date(), new Date(profile.dateLastPlayed))

        profile.isInactive = profile.daysSinceLastPlayed >= 30

        resolve(profile)
      })
      .catch(error => reject(error))
  })
}

export async function getPostGameCarnage(activityId) {
  return new Promise((resolve, reject) => {
    const request = createRequest(`/Stats/PostGameCarnageReport/${activityId}/`)

    rp(request)
      .then(response => resolve(response.Response))
      .catch(error => reject(error))
  })
}

export async function getMemberCharacterActivity(membershipId, characterId) {
  return new Promise((resolve, reject) => {
    const activityRequest = createRequest(`/1/Account/${membershipId}/Character/${characterId}/Stats/Activities`)

    rp(activityRequest)
      .then(response => resolve(response.Response.activities))
      .catch(error => reject(error))
  })
}

export async function getMemberCharacters(membershipId) {
  return new Promise((resolve, reject) => {
    const profileRequest = createRequest(`/1/Profile/${membershipId}?components=200`)

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
