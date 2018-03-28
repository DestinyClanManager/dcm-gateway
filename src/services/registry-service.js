import rp from 'request-promise'

export async function getRegisteredClans() {
  return new Promise((resolve, reject) => {
    const request = {
      uri: process.env.REGISTRY_BASE_URL,
      json: true
    }

    rp(request)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

export function registerClan(clanId) {
  return new Promise((resolve, reject) => {
    const request = {
      method: 'POST',
      uri: process.env.REGISTRY_BASE_URL,
      body: { clanId },
      json: true
    }

    rp(request)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}
