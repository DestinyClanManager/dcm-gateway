import rp from 'request-promise'

export async function getActivity(clanId) {
  return new Promise((resolve, reject) => {
    const request = {
      uri: `${process.env.ACTIVITY_BASE_URL}/${clanId}`,
      json: true
    }

    rp(request)
      .then(response => {
        const profiles = response.map(result => result.profile)
        resolve(profiles)
      })
      .catch(error => reject(error))
  })
}
