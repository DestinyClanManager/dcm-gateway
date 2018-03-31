import nock from 'nock'

describe('activity-service', () => {
  let subject, mockHttp

  beforeEach(() => {
    mockHttp = nock('http://activity-url')
    subject = require('./activity-service')
  })

  describe('getActivity', () => {
    let actual

    beforeEach(async () => {
      const response = [
        {
          membershipId: 'membership-id-1',
          profile: 'profile-1',
          clanId: 'clan-id'
        },
        {
          membershipId: 'membership-id-2',
          profile: 'profile-2',
          clanId: 'clan-id'
        },
        {
          membershipId: 'membership-id-3',
          profile: 'profile-3',
          clanId: 'clan-id'
        }
      ]
      mockHttp.get('/clan-id').reply(200, response)
      actual = await subject.getActivity('clan-id')
    })

    it('returns the activity profiles for the given clan', () => {
      const expected = ['profile-1', 'profile-2', 'profile-3']
      expect(actual).toEqual(expected)
    })
  })
})
