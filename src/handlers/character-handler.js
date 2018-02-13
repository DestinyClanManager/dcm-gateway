import rp from 'request-promise'

export function getCharacterActivity(membershipId, characterId) {
  return new Promise((resolve, reject) => {
    const activityRequest = {
      uri: `${process.env.API_BASE_URL}/Destiny2/1/Account/${membershipId}/Character/${characterId}/Stats/Activities`,
      json: true,
      headers: { 'X-API-Key': process.env.API_KEY }
    }

    rp(activityRequest)
      .then(response => {
        resolve(response)
      })
      .catch(error => reject(error))
  })
}
