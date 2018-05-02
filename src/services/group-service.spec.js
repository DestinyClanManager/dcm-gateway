import nock from 'nock'

describe('group service', () => {
  let subject, mockHttp

  beforeEach(() => {
    mockHttp = nock('http://bungie-base-url')
    subject = require('./group-service')
  })

  describe('inviteMemberToGroup', () => {
    beforeEach(() => {
      const response = {
        Response: {
          resolution: 0
        }
      }
      mockHttp.post('/GroupV2/group-id/Members/IndividualInvite/membership-type/membership-id/').reply(200, response)
    })

    it('resolves with the membershipId and resolveState', async () => {
      const membership = {
        id: 'membership-id',
        type: 'membership-type'
      }
      const actual = await subject.inviteMemberToGroup('group-id', membership, 'message', 'Bearer bearer-token')

      expect(actual).toEqual({ membershipId: 'membership-id', resolveState: 0 })
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

      it('returns the error', async () => {
        let actual = await subject.cancelGroupInvite('group-id', 'membership-type', 'membership-id', 'bearer-token')
        expect(actual).toEqual('response')
      })
    })
  })
})
