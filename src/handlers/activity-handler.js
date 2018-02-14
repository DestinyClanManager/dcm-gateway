import rp from 'request-promise'

export function getPostGameCarnageReport(activityId) {
  return new Promise((resolve, reject) => {
    const request = {
      uri: `${process.env.API_BASE_URL}/Destiny2/Stats/PostGameCarnageReport/${activityId}/`,
      headers: { 'X-API-Key': process.env.API_KEY },
      json: true
    }

    rp(request)
      .then(response => {
        resolve(response.Response)
      })
      .catch(error => reject(error))
  })
}
