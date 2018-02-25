import rp from 'request-promise'

function createRequest(endpoint, options = {}) {
  return Object.assign(
    {},
    {
      uri: `${process.env.EXEMPTIONS_BASE_URL}${endpoint}`,
      json: true
    },
    options
  )
}

export function getExemptionsForClan(clanId) {
  return new Promise((resolve, reject) => {
    const request = createRequest(`/${clanId}`)

    rp(request)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

export function createExemptionForMember(clanId, exemption) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      body: exemption
    }
    const request = createRequest(`/${clanId}`, options)

    rp(request)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

export function editExemption(clanId, exemption) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'PUT',
      body: exemption
    }
    const request = createRequest(`/${clanId}/${exemption.membershipId}`, options)

    rp(request)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}
