import rp from 'request-promise'

export async function getRemovalsForClan(clanId) {
  return new Promise((resolve, reject) => {
    const request = {
      uri: `${process.env.REMOVAL_BASE_URL}/${clanId}`,
      json: true
    }

    rp(request)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}
