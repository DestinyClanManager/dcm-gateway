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
})
