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

export async function startActivityReport(clanId) {
  return new Promise((resolve, reject) => {
    const request = {
      uri: process.env.ACTIVITY_BASE_URL,
      method: 'POST',
      json: true,
      body: { clanId }
    }

    rp(request)
      .then(() => {
        resolve(true)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export async function cleanUpActivityReport(clanId) {
  return new Promise((resolve, reject) => {
    const request = {
      uri: `${process.env.ACTIVITY_BASE_URL}/${clanId}/clean-up`,
      method: 'POST',
      json: true
    }

    rp(request)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}
