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

export async function addRemovalForClan(clanId, removal) {
  return new Promise((resolve, reject) => {
    const request = {
      uri: `${process.env.REMOVAL_BASE_URL}/${clanId}`,
      json: true,
      body: removal,
      method: 'POST'
    }

    rp(request)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

export async function addRemovalsForClan(clanId, removals) {
  return new Promise((resolve, reject) => {
    const request = {
      uri: `${process.env.REMOVAL_BASE_URL}/${clanId}/batch`,
      json: true,
      body: removals,
      method: 'POST'
    }

    rp(request)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}
