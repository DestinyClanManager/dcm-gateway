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
  return diff / (1000 * 60 * 60 * 24)
}

export async function getProfile(membershipId) {
  return new Promise((resolve, reject) => {
    const profileRequest = createRequest(`/1/Profile/${membershipId}?components=100`)

    rp(profileRequest)
      .then(response => {
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
