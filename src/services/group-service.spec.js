import nock from 'nock'

describe('group service', () => {
  let subject, mockHttp

  beforeEach(() => {
    mockHttp = nock('http://bungie-base-url')
    subject = require('./group-service')
  })

  describe('getMembersOfGroup', () => {
    let actual

    describe('when the request is successful', () => {
      beforeEach(async () => {
        const response = {
          Response: {
            results: 'the-results'
          }
        }
        mockHttp.get('/GroupV2/group-id/Members').reply(200, response)

        actual = await subject.getMembersOfGroup('group-id')
      })

      it('returns the results in the response', () => {
        expect(actual).toEqual('the-results')
      })
    })

    describe('when the request is not successful', () => {
      beforeEach(async () => {
        mockHttp.get('/GroupV2/group-id/Members').replyWithError('oh no!')

        try {
          await subject.getMembersOfGroup('group-id')
        } catch (error) {
          actual = error
        }
      })

      it('returns the error', () => {
        expect(actual.message).toEqual('Error: oh no!')
      })
    })
  })

  describe('getMemberDetails', () => {
    let actual

    describe('when the request is successful', () => {
      beforeEach(async () => {
        const response = {
          Response: {
            results: 'the-results'
          }
        }
        mockHttp.get('/GroupV2/User/254/membership-id/0/1/').reply(200, response)
        actual = await subject.getMemberDetails('membership-id')
      })

      it('unwraps the results from the response', () => {
        expect(actual).toEqual('the-results')
      })
    })

    describe('when the request is unsuccessful', () => {
      beforeEach(async () => {
        mockHttp.get('/GroupV2/User/254/membership-id/0/1/').replyWithError('oh no!')
        try {
          await subject.getMemberDetails('membership-id')
        } catch (error) {
          actual = error
        }
      })

      it('unwraps the results from the response', () => {
        expect(actual.message).toEqual('Error: oh no!')
      })
    })
  })

  describe('kickMemberFromGroup', () => {
    describe('when the request fails', () => {
      beforeEach(() => {
        nock('http://bungie-base-url', {
          reqheaders: {
            'X-API-Key': 'api-key',
            Authorization: 'bearer-token'
          }
        })
          .post('/GroupV2/group-id/Members/membership-type/membership-id/Kick/')
          .replyWithError('an-error')
      })

      it('returns the error', async () => {
        try {
          await subject.kickMemberFromGroup('group-id', 'membership-type', 'membership-id', 'bearer-token')
        } catch (error) {
          expect(error.message).toContain('an-error')
        }
      })
    })

    describe('when the request is unathorized', () => {
      beforeEach(() => {
        nock('http://bungie-base-url', {
          reqheaders: {
            'X-API-Key': 'api-key',
            Authorization: 'bearer-token'
          }
        })
          .post('/GroupV2/group-id/Members/membership-type/membership-id/Kick/')
          .reply(200, {
            ErrorCode: 99
          })
      })

      it('returns unauthorized', async () => {
        try {
          await subject.kickMemberFromGroup('group-id', 'membership-type', 'membership-id', 'bearer-token')
        } catch (error) {
          expect(error.message).toContain('Unauthorized')
        }
      })
    })

    describe('when the request succeeds', () => {
      beforeEach(() => {
        nock('http://bungie-base-url', {
          reqheaders: {
            'X-API-Key': 'api-key',
            Authorization: 'bearer-token'
          }
        })
          .post('/GroupV2/group-id/Members/membership-type/membership-id/Kick/')
          .reply(200, 'response')
      })

      it('returns the response', async () => {
        let actual = await subject.kickMemberFromGroup('group-id', 'membership-type', 'membership-id', 'bearer-token')

        expect(actual).toEqual('response')
      })
    })
  })

  describe('getPendingMembersOfGroup', () => {
    let actual

    describe('when the request succeeds', () => {
      beforeEach(async () => {
        const response = {
          Response: 'the-response'
        }
        nock('http://bungie-base-url', {
          reqheaders: {
            'X-API-Key': 'api-key',
            Authorization: 'auth-token'
          }
        })
          .get('/GroupV2/clan-id/Members/Pending')
          .reply(200, response)

        actual = await subject.getPendingMembersOfGroup('clan-id', 'auth-token')
      })

      it('returns the response', () => {
        expect(actual).toEqual('the-response')
      })
    })

    describe('when the request is unauthorized', () => {
      beforeEach(async () => {
        const response = {
          ErrorCode: 99
        }
        nock('http://bungie-base-url', {
          reqheaders: {
            'X-API-Key': 'api-key',
            Authorization: 'auth-token'
          }
        })
          .get('/GroupV2/clan-id/Members/Pending')
          .reply(200, response)

        try {
          await subject.getPendingMembersOfGroup('clan-id', 'auth-token')
        } catch (error) {
          actual = error
        }
      })

      it('returns the an unauthorized error', () => {
        expect(actual.message).toEqual('Unauthorized')
        expect(actual.status).toEqual(401)
      })
    })

    describe('when the request fails', () => {
      beforeEach(async () => {
        nock('http://bungie-base-url', {
          reqheaders: {
            'X-API-Key': 'api-key',
            Authorization: 'auth-token'
          }
        })
          .get('/GroupV2/clan-id/Members/Pending')
          .replyWithError('oh no!')

        try {
          await subject.getPendingMembersOfGroup('clan-id', 'auth-token')
        } catch (error) {
          actual = error
        }
      })

      it('returns the an unauthorized error', () => {
        expect(actual.message).toEqual('Error: oh no!')
      })
    })
  })

  describe('getInvitedMembersForGroup', () => {
    let actual

    describe('when the request succeeds', () => {
      beforeEach(async () => {
        const response = {
          Response: 'the-response'
        }
        nock('http://bungie-base-url', {
          reqheaders: {
            'X-API-Key': 'api-key',
            Authorization: 'auth-token'
          }
        })
          .get('/GroupV2/clan-id/Members/InvitedIndividuals')
          .reply(200, response)

        actual = await subject.getInvitedMembersForGroup('clan-id', 'auth-token')
      })

      it('returns the response', () => {
        expect(actual).toEqual('the-response')
      })
    })

    describe('when the request is unauthorized', () => {
      beforeEach(async () => {
        const response = {
          ErrorCode: 99
        }
        nock('http://bungie-base-url', {
          reqheaders: {
            'X-API-Key': 'api-key',
            Authorization: 'auth-token'
          }
        })
          .get('/GroupV2/clan-id/Members/InvitedIndividuals')
          .reply(200, response)

        try {
          await subject.getInvitedMembersForGroup('clan-id', 'auth-token')
        } catch (error) {
          actual = error
        }
      })

      it('returns an unauthorized error', () => {
        expect(actual.message).toEqual('Unauthorized')
        expect(actual.status).toEqual(401)
      })
    })

    describe('when the request fails', () => {
      beforeEach(async () => {
        nock('http://bungie-base-url', {
          reqheaders: {
            'X-API-Key': 'api-key',
            Authorization: 'auth-token'
          }
        })
          .get('/GroupV2/clan-id/Members/InvitedIndividuals')
          .replyWithError('oh no!')

        try {
          await subject.getInvitedMembersForGroup('clan-id', 'auth-token')
        } catch (error) {
          actual = error
        }
      })

      it('returns the error', () => {
        expect(actual.message).toEqual('Error: oh no!')
      })
    })
  })

  describe('approvePendingForList', () => {
    let actual

    describe('when the request is successful', () => {
      beforeEach(async () => {
        const response = 'the-response'
        const expectedBody = ['memberships']
        nock('http://bungie-base-url', {
          reqheaders: {
            Authorization: 'auth-token',
            'X-API-Key': 'api-key'
          }
        })
          .post('/GroupV2/group-id/Members/ApproveList/', expectedBody)
          .reply(200, response)

        actual = await subject.approvePendingForList('group-id', ['memberships'], 'auth-token')
      })

      it('returns the response', () => {
        expect(actual).toEqual('the-response')
      })
    })

    describe('when the request is unauthorized', () => {
      beforeEach(async () => {
        const response = {
          ErrorCode: 99
        }
        const expectedBody = ['memberships']
        nock('http://bungie-base-url', {
          reqheaders: {
            Authorization: 'auth-token',
            'X-API-Key': 'api-key'
          }
        })
          .post('/GroupV2/group-id/Members/ApproveList/', expectedBody)
          .reply(200, response)

        try {
          await subject.approvePendingForList('group-id', ['memberships'], 'auth-token')
        } catch (error) {
          actual = error
        }
      })

      it('returns an unauthorized error', () => {
        expect(actual.message).toEqual('Unauthorized')
        expect(actual.status).toEqual(401)
      })
    })

    describe('when the request fails', () => {
      beforeEach(async () => {
        const expectedBody = ['memberships']
        nock('http://bungie-base-url', {
          reqheaders: {
            Authorization: 'auth-token',
            'X-API-Key': 'api-key'
          }
        })
          .post('/GroupV2/group-id/Members/ApproveList/', expectedBody)
          .replyWithError('oh no!')

        try {
          await subject.approvePendingForList('group-id', ['memberships'], 'auth-token')
        } catch (error) {
          actual = error
        }
      })

      it('returns an unauthorized error', () => {
        expect(actual.message).toEqual('Error: oh no!')
      })
    })
  })

  describe('denyPendingForList', () => {
    let actual

    describe('when the request is successful', () => {
      beforeEach(async () => {
        const expectedBody = ['memberships']
        nock('http://bungie-base-url', {
          reqheaders: {
            Authorization: 'auth-token',
            'X-API-Key': 'api-key'
          }
        })
          .post('/GroupV2/group-id/Members/DenyList/', expectedBody)
          .reply(200, 'response')

        actual = await subject.denyPendingForList('group-id', ['memberships'], 'auth-token')
      })

      it('returns the response', () => {
        expect(actual).toEqual('response')
      })
    })

    describe('when the request is unauthorized', () => {
      beforeEach(async () => {
        const expectedBody = ['memberships']
        const response = {
          ErrorCode: 99
        }
        nock('http://bungie-base-url', {
          reqheaders: {
            Authorization: 'auth-token',
            'X-API-Key': 'api-key'
          }
        })
          .post('/GroupV2/group-id/Members/DenyList/', expectedBody)
          .reply(200, response)

        try {
          await subject.denyPendingForList('group-id', ['memberships'], 'auth-token')
        } catch (error) {
          actual = error
        }
      })

      it('returns an authorized error', () => {
        expect(actual.message).toEqual('Unauthorized')
        expect(actual.status).toEqual(401)
      })
    })

    describe('when the request fails', () => {
      beforeEach(async () => {
        const expectedBody = ['memberships']
        nock('http://bungie-base-url', {
          reqheaders: {
            Authorization: 'auth-token',
            'X-API-Key': 'api-key'
          }
        })
          .post('/GroupV2/group-id/Members/DenyList/', expectedBody)
          .replyWithError('oh no!')

        try {
          await subject.denyPendingForList('group-id', ['memberships'], 'auth-token')
        } catch (error) {
          actual = error
        }
      })

      it('returns an authorized error', () => {
        expect(actual.message).toEqual('Error: oh no!')
      })
    })
  })

  describe('inviteMemberToGroup', () => {
    let actual, membership

    describe('when the resquest is successful', () => {
      beforeEach(async () => {
        membership = {
          id: 'membership-id',
          type: 'membership-type'
        }

        const response = {
          Response: {
            resolution: 0
          }
        }
        nock('http://bungie-base-url', {
          reqheaders: { Authorization: 'auth-token' }
        })
          .post('/GroupV2/group-id/Members/IndividualInvite/membership-type/membership-id/')
          .reply(200, response)

        actual = await subject.inviteMemberToGroup('group-id', membership, 'message', 'auth-token')
      })

      it('resolves with the membershipId and resolveState', async () => {
        expect(actual).toEqual({ membershipId: 'membership-id', resolveState: 0 })
      })
    })

    describe('when the resquest is unauthorized', () => {
      beforeEach(async () => {
        membership = {
          id: 'membership-id',
          type: 'membership-type'
        }

        const response = {
          ErrorCode: 99
        }
        nock('http://bungie-base-url', {
          reqheaders: { Authorization: 'auth-token' }
        })
          .post('/GroupV2/group-id/Members/IndividualInvite/membership-type/membership-id/', { message: 'message' })
          .reply(200, response)

        try {
          await subject.inviteMemberToGroup('group-id', membership, 'message', 'auth-token')
        } catch (error) {
          actual = error
        }
      })

      it('returns an authorized error', () => {
        expect(actual.message).toEqual('Unauthorized')
        expect(actual.status).toEqual(401)
      })
    })

    describe('when the resquest fails', () => {
      beforeEach(async () => {
        membership = {
          id: 'membership-id',
          type: 'membership-type'
        }

        nock('http://bungie-base-url', {
          reqheaders: { Authorization: 'auth-token' }
        })
          .post('/GroupV2/group-id/Members/IndividualInvite/membership-type/membership-id/', { message: 'message' })
          .replyWithError('oh no!')

        try {
          await subject.inviteMemberToGroup('group-id', membership, 'message', 'auth-token')
        } catch (error) {
          actual = error
        }
      })

      it('returns an authorized error', () => {
        expect(actual.message).toEqual('Error: oh no!')
      })
    })
  })

  describe('cancelGroupInvite', () => {
    describe('when the request fails', () => {
      beforeEach(() => {
        nock('http://bungie-base-url', {
          reqheaders: {
            'X-API-Key': 'api-key',
            Authorization: 'bearer-token'
          }
        })
          .post('/GroupV2/group-id/Members/IndividualInviteCancel/membership-type/membership-id/')
          .replyWithError('an-error')
      })

      it('returns the error', async () => {
        try {
          await subject.cancelGroupInvite('group-id', 'membership-type', 'membership-id', 'bearer-token')
        } catch (error) {
          expect(error.message).toContain('an-error')
        }
      })
    })

    describe('when the request is unauthorized', () => {
      beforeEach(() => {
        nock('http://bungie-base-url', {
          reqheaders: {
            'X-API-Key': 'api-key',
            Authorization: 'bearer-token'
          }
        })
          .post('/GroupV2/group-id/Members/IndividualInviteCancel/membership-type/membership-id/')
          .reply(200, {
            ErrorCode: 99
          })
      })

      it('returns unauthorized', async () => {
        try {
          await subject.cancelGroupInvite('group-id', 'membership-type', 'membership-id', 'bearer-token')
        } catch (error) {
          expect(error.message).toContain('Unauthorized')
        }
      })
    })

    describe('when the request succeeds', () => {
      beforeEach(() => {
        nock('http://bungie-base-url', {
          reqheaders: {
            'X-API-Key': 'api-key',
            Authorization: 'bearer-token'
          }
        })
          .post('/GroupV2/group-id/Members/IndividualInviteCancel/membership-type/membership-id/')
          .reply(200, 'response')
      })

      it('returns the response', async () => {
        let actual = await subject.cancelGroupInvite('group-id', 'membership-type', 'membership-id', 'bearer-token')
        expect(actual).toEqual('response')
      })
    })
  })

  describe('changeMemberType', () => {
    let actual

    describe('when the request succeeds', () => {
      beforeEach(async () => {
        nock('http://bungie-base-url', {
          reqheaders: {
            'X-API-Key': 'api-key',
            Authorization: 'bearer-token'
          }
        })
          .post('/GroupV2/group-id/Members/membership-type/membership-id/SetMembershipType/member-type/')
          .reply(200, 'response')

        actual = await subject.changeMemberType('group-id', 'membership-type', 'membership-id', 'member-type', 'bearer-token')
      })

      it('returns the response', () => {
        expect(actual).toEqual('response')
      })
    })

    describe('when the request is unauthorized', () => {
      beforeEach(async () => {
        const response = {
          ErrorCode: 99
        }
        nock('http://bungie-base-url', {
          reqheaders: {
            'X-API-Key': 'api-key',
            Authorization: 'bearer-token'
          }
        })
          .post('/GroupV2/group-id/Members/membership-type/membership-id/SetMembershipType/member-type/')
          .reply(200, response)

        try {
          await subject.changeMemberType('group-id', 'membership-type', 'membership-id', 'member-type', 'bearer-token')
        } catch (error) {
          actual = error
        }
      })

      it('returns the response', () => {
        expect(actual.message).toEqual('Unauthorized')
        expect(actual.status).toEqual(401)
      })
    })

    describe('when the request fails', () => {
      beforeEach(async () => {
        const response = {
          ErrorCode: 99
        }
        nock('http://bungie-base-url', {
          reqheaders: {
            'X-API-Key': 'api-key',
            Authorization: 'bearer-token'
          }
        })
          .post('/GroupV2/group-id/Members/membership-type/membership-id/SetMembershipType/member-type/')
          .replyWithError('oh no!')

        try {
          await subject.changeMemberType('group-id', 'membership-type', 'membership-id', 'member-type', 'bearer-token')
        } catch (error) {
          actual = error
        }
      })

      it('returns the response', () => {
        expect(actual.message).toEqual('Error: oh no!')
      })
    })
  })

  describe('getBannedMembersOfGroup', () => {
    let actual

    describe('when the request is successful', () => {
      beforeEach(async () => {
        const response = {
          Response: {
            results: 'the-results'
          }
        }
        nock('http://bungie-base-url', {
          reqheaders: {
            'X-API-Key': 'api-key',
            Authorization: 'auth-token'
          }
        })
          .get('/GroupV2/group-id/Banned/')
          .reply(200, response)

        actual = await subject.getBannedMembersOfGroup('group-id', 'auth-token')
      })

      it('unwraps the results from the response', () => {
        expect(actual).toEqual('the-results')
      })
    })

    describe('when the request is unauthorized', () => {
      beforeEach(async () => {
        const response = {
          ErrorCode: 99
        }
        nock('http://bungie-base-url', {
          reqheaders: {
            'X-API-Key': 'api-key',
            Authorization: 'auth-token'
          }
        })
          .get('/GroupV2/group-id/Banned/')
          .reply(200, response)

        try {
          await subject.getBannedMembersOfGroup('group-id', 'auth-token')
        } catch (error) {
          actual = error
        }
      })

      it('throws an unauthorized error`', () => {
        expect(actual.message).toEqual('Unauthorized')
        expect(actual.status).toEqual(401)
      })
    })

    describe('when the request fails', () => {
      beforeEach(async () => {
        nock('http://bungie-base-url', {
          reqheaders: {
            'X-API-Key': 'api-key',
            Authorization: 'auth-token'
          }
        })
          .get('/GroupV2/group-id/Banned/')
          .replyWithError('oh no!')

        try {
          await subject.getBannedMembersOfGroup('group-id', 'auth-token')
        } catch (error) {
          actual = error
        }
      })

      it('throws an unauthorized error`', () => {
        expect(actual.message).toEqual('Error: oh no!')
      })
    })
  })

  describe('unbanMember', () => {
    let actual

    describe('when the request is successful', () => {
      beforeEach(async () => {
        nock('http://bungie-base-url', {
          reqheaders: {
            Authorization: 'auth-token',
            'X-API-Key': 'api-key'
          }
        })
          .post('/GroupV2/group-id/Members/membership-type/membership-id/Unban/')
          .reply(200, 'the-response')

        actual = await subject.unbanMember('group-id', 'membership-type', 'membership-id', 'auth-token')
      })

      it('returns the response', () => {
        expect(actual).toEqual('the-response')
      })
    })

    describe('when the request is unauthorized', () => {
      beforeEach(async () => {
        nock('http://bungie-base-url', {
          reqheaders: {
            Authorization: 'auth-token',
            'X-API-Key': 'api-key'
          }
        })
          .post('/GroupV2/group-id/Members/membership-type/membership-id/Unban/')
          .reply(200, { ErrorCode: 99 })

        try {
          await subject.unbanMember('group-id', 'membership-type', 'membership-id', 'auth-token')
        } catch (error) {
          actual = error
        }
      })

      it('returns the response', () => {
        expect(actual.message).toEqual('Unauthorized')
        expect(actual.status).toEqual(401)
      })
    })

    describe('when the request fails', () => {
      beforeEach(async () => {
        nock('http://bungie-base-url', {
          reqheaders: {
            Authorization: 'auth-token',
            'X-API-Key': 'api-key'
          }
        })
          .post('/GroupV2/group-id/Members/membership-type/membership-id/Unban/')
          .replyWithError('oh no!')

        try {
          await subject.unbanMember('group-id', 'membership-type', 'membership-id', 'auth-token')
        } catch (error) {
          actual = error
        }
      })

      it('returns the response', () => {
        expect(actual.message).toEqual('Error: oh no!')
      })
    })
  })
})
