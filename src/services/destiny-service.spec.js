import nock from 'nock'

describe('destiny service', () => {
  let subject, mockHttp

  beforeEach(() => {
    mockHttp = nock('http://bungie-base-url')
    subject = require('./destiny-service')
  })

  describe('getPostGameCarnage', () => {
    describe('when the request fails', () => {
      beforeEach(() => {
        mockHttp.get('/Destiny2/Stats/PostGameCarnageReport/activity-id/').reply(500, 'an error')
      })

      it('bubbles up the error', async () => {
        try {
          await subject.getPostGameCarnage('activity-id')
        } catch (error) {
          expect(error.message).toContain('an error')
        }
      })
    })

    describe('when the request succeeds', () => {
      let actual

      beforeEach(async () => {
        const response = {
          Response: 'the-post-game-carnage-report'
        }
        mockHttp.get('/Destiny2/Stats/PostGameCarnageReport/activity-id/').reply(200, response)
        actual = await subject.getPostGameCarnage('activity-id')
      })

      it('returns the post game carnage report', () => {
        expect(actual).toEqual('the-post-game-carnage-report')
      })
    })
  })

  describe('getMemberCharacterActivity', () => {
    describe('when the request fails', () => {
      beforeEach(() => {
        http: mockHttp.get('/Destiny2/membership-type/Account/membership-id/Character/character-id/Stats/Activities').replyWithError('an-error')
      })

      it('returns the error response', async () => {
        try {
          await subject.getMemberCharacterActivity('membership-type', 'membership-id', 'character-id')
        } catch (error) {
          expect(error.message).toContain('an-error')
        }
      })
    })

    describe('when the request succeeds', () => {
      let actual

      beforeEach(async () => {
        const response = {
          Response: { activities: 'the-activities' }
        }
        mockHttp.get('/Destiny2/membership-type/Account/membership-id/Character/character-id/Stats/Activities').reply(200, response)

        actual = await subject.getMemberCharacterActivity('membership-type', 'membership-id', 'character-id')
      })

      it('returns the activity', () => {
        expect(actual).toEqual('the-activities')
      })
    })
  })

  describe('getMemberCharacters', () => {
    describe('when the request fails', () => {
      beforeEach(() => {
        mockHttp.get('/Destiny2/membership-type/Profile/membership-id?components=200').replyWithError('an-error')
      })

      it('returns the error', async () => {
        try {
          await subject.getMemberCharacters('membership-type', 'membership-id')
        } catch (error) {
          expect(error.message).toContain('an-error')
        }
      })
    })

    describe('when the request succeeds', () => {
      let actual

      beforeEach(async () => {
        const response = {
          ErrorStatus: 'Success',
          Response: {
            characters: {
              data: {
                1: 'character-1',
                2: 'character-2'
              }
            }
          }
        }
        mockHttp.get('/Destiny2/membership-type/Profile/membership-id?components=200').reply(200, response)

        actual = await subject.getMemberCharacters('membership-type', 'membership-id')
      })

      it('returns the members characters', () => {
        expect(actual).toEqual(['character-1', 'character-2'])
      })
    })
  })

  describe('getProfile', () => {
    let actual

    beforeEach(async () => {
      mockHttp.get('/Destiny2/membership-type/Profile/membership-id?components=100').reply(200, { Response: { profile: 'profile' } })
      actual = await subject.getProfile('membership-type', 'membership-id')
    })

    it('returns the member profile', () => {
      expect(actual).toEqual('profile')
    })
  })

  describe('getClanWeeklyRewards', () => {
    let actual

    describe('when the request is successful', () => {
      beforeEach(async () => {
        const response = { Response: 'the-response' }
        mockHttp.get('/Destiny2/Clan/clan-id/WeeklyRewardState').reply(200, response)
        actual = await subject.getClanWeeklyRewards('clan-id')
      })

      it('returns the response', () => {
        expect(actual).toEqual('the-response')
      })
    })

    describe('when the request fails', () => {
      beforeEach(async () => {
        const response = { Response: 'the-response' }
        mockHttp.get('/Destiny2/Clan/clan-id/WeeklyRewardState').replyWithError('Oh no!')
        try {
          await subject.getClanWeeklyRewards('clan-id')
        } catch (error) {
          actual = error
        }
      })

      it('returns the response', () => {
        expect(actual.message).toEqual('Error: Oh no!')
      })
    })
  })

  describe('getHistoricalStats', () => {
    let actual

    beforeEach(async () => {
      const response = { Response: 'the-response' }

      mockHttp
        .get('/Destiny2/membership-type/Account/membership-id/Character/0/Stats/')
        .query({ modes: '5,6,4,2,18,63' })
        .reply(200, response)

      actual = await subject.getHistoricalStats('membership-type', 'membership-id')
    })

    it('returns the response', () => {
      expect(actual).toEqual('the-response')
    })
  })
})
