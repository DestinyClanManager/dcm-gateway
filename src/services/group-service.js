import rp from 'request-promise'

function createRequest(endpoint = '/', headers = {}) {
  return {
    uri: `${process.env.API_BASE_URL}/GroupV2${endpoint}`,
    headers: Object.assign({}, headers, {
      'X-API-Key': process.env.API_KEY
    }),
    json: true
  }
}

function checkAndHandleUnauthorized(response) {
  if (response.ErrorCode === 99) {
    const unauthorized = new Error('Unauthorized')
    unauthorized.status = 401
    throw unauthorized
  }

  return response
}

function createKickRequestsForMembers(groupId, members, bearerToken) {
  return members.map(member => {
    const request = {
      uri: `${process.env.API_BASE_URL}/GroupV2/${groupId}/Members/${member.membershipType}/${member.membershipId}/Kick/`,
      method: 'POST',
      json: true,
      headers: {
        'X-API-Key': process.env.API_KEY,
        Authorization: bearerToken
      }
    }

    return rp(request)
  })
}

export async function getMembersOfGroup(groupId) {
  return new Promise((resolve, reject) => {
    const membersRequest = createRequest(`/${groupId}/Members`)
    rp(membersRequest)
      .then(response => resolve(response.Response.results))
      .catch(error => reject(error))
  })
}

export async function getMemberDetails(membershipId) {
  return new Promise((resolve, reject) => {
    const memberRequest = createRequest(`/User/254/${membershipId}/0/1/`)

    rp(memberRequest)
      .then(response => resolve(response.Response.results))
      .catch(error => reject(error))
  })
}

export async function kickMemberFromGroup(groupId, membershipType, membershipId, bearerToken) {
  return new Promise((resolve, reject) => {
    const request = {
      uri: `${process.env.API_BASE_URL}/GroupV2/${groupId}/Members/${membershipType}/${membershipId}/Kick/`,
      method: 'POST',
      json: true,
      headers: {
        'X-API-Key': process.env.API_KEY,
        Authorization: bearerToken
      }
    }

    rp(request)
      .then(response => checkAndHandleUnauthorized(response))
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

export async function kickMembersOfGroup(groupId, members, bearerToken) {
  return new Promise((resolve, reject) => {
    const requests = createKickRequestsForMembers(groupId, members, bearerToken)

    Promise.all(requests)
      .then(() => resolve())
      .catch(error => reject(error))
  })
}

export async function getPendingMembersOfGroup(groupId, authToken) {
  return new Promise((resolve, reject) => {
    const request = createRequest(`/${groupId}/Members/Pending`, {
      Authorization: authToken
    })

    rp(request)
      .then(response => checkAndHandleUnauthorized(response))
      .then(response => resolve(response.Response))
      .catch(error => reject(error))
  })
}

export async function getInvitedMembersForGroup(groupId, authToken) {
  return new Promise((resolve, reject) => {
    const request = createRequest(`/${groupId}/Members/InvitedIndividuals`, {
      Authorization: authToken
    })

    rp(request)
      .then(response => checkAndHandleUnauthorized(response))
      .then(response => resolve(response.Response))
      .catch(error => reject(error))
  })
}

export async function approvePendingForList(groupId, memberships, authToken) {
  return new Promise((resolve, reject) => {
    const request = {
      method: 'POST',
      uri: `${process.env.API_BASE_URL}/GroupV2/${groupId}/Members/ApproveList/`,
      headers: {
        'X-API-Key': process.env.API_KEY,
        Authorization: authToken
      },
      json: true,
      body: memberships
    }

    rp(request)
      .then(response => checkAndHandleUnauthorized(response))
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

export async function denyPendingForList(groupId, memberships, authToken) {
  return new Promise((resolve, reject) => {
    const request = {
      method: 'POST',
      uri: `${process.env.API_BASE_URL}/GroupV2/${groupId}/Members/DenyList/`,
      headers: {
        'X-API-Key': process.env.API_KEY,
        Authorization: authToken
      },
      json: true,
      body: memberships
    }

    rp(request)
      .then(response => checkAndHandleUnauthorized(response))
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

export async function inviteMemberToGroup(groupId, membership, message, authToken) {
  return new Promise((resolve, reject) => {
    const request = {
      method: 'POST',
      uri: `${process.env.API_BASE_URL}/GroupV2/${groupId}/Members/IndividualInvite/${membership.type}/${membership.id}/`,
      headers: {
        'X-API-Key': process.env.API_KEY,
        Authorization: authToken
      },
      json: true,
      body: { message }
    }

    rp(request)
      .then(response => checkAndHandleUnauthorized(response))
      .then(response => {
        resolve({
          membershipId: membership.id,
          resolveState: response.Response.resolution
        })
      })
      .catch(error => reject(error))
  })
}

export async function cancelGroupInvite(groupId, membershipType, membershipId, authToken) {
  return new Promise((resolve, reject) => {
    const request = {
      method: 'POST',
      uri: `${process.env.API_BASE_URL}/GroupV2/${groupId}/Members/IndividualInviteCancel/${membershipType}/${membershipId}/`,
      json: true,
      headers: {
        'X-API-Key': process.env.API_KEY,
        Authorization: authToken
      }
    }

    rp(request)
      .then(response => checkAndHandleUnauthorized(response))
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

export async function changeMemberType(groupId, membershipType, membershipId, memberType, authToken) {
  return new Promise((resolve, reject) => {
    const request = {
      method: 'POST',
      uri: `${process.env.API_BASE_URL}/GroupV2/${groupId}/Members/${membershipType}/${membershipId}/SetMembershipType/${memberType}/`,
      json: true,
      headers: {
        'X-API-Key': process.env.API_KEY,
        Authorization: authToken
      }
    }

    rp(request)
      .then(response => checkAndHandleUnauthorized(response))
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

export async function getBannedMembersOfGroup(groupId, authToken) {
  return new Promise((resolve, reject) => {
    const request = createRequest(`/${groupId}/Banned/`, {
      Authorization: authToken
    })

    rp(request)
      .then(response => checkAndHandleUnauthorized(response))
      .then(response => resolve(response.Response.results))
      .catch(error => reject(error))
  })
}

export async function unbanMember(groupId, membershipType, membershipId, authToken) {
  return new Promise((resolve, reject) => {
    const request = {
      method: 'POST',
      uri: `${process.env.API_BASE_URL}/GroupV2/${groupId}/Members/${membershipType}/${membershipId}/Unban/`,
      json: true,
      headers: {
        'X-API-Key': process.env.API_KEY,
        Authorization: authToken
      }
    }

    rp(request)
      .then(response => checkAndHandleUnauthorized(response))
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

export async function banMember(groupId, membershipType, membershipId, authToken) {
  return new Promise((resolve, reject) => {
    const request = {
      method: 'POST',
      uri: `${process.env.API_BASE_URL}/GroupV2/${groupId}/Members/${membershipType}/${membershipId}/Ban/`,
      json: true,
      headers: {
        'X-API-Key': process.env.API_KEY,
        Authorization: authToken
      },
      body: {
        message: '',
        length: 8
      }
    }

    rp(request)
      .then(response => checkAndHandleUnauthorized(response))
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}
