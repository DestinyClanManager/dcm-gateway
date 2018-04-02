import nock from 'nock'

describe('destiny service', () => {
  let subject, mockHttp

  beforeEach(() => {
    mockHttp = nock('http://bungie-base-url')
    subject = require('./destiny-service')
  })

  describe('getProfile', () => {
    describe('when the member profile is not found', () => {
      beforeEach(async () => {
        const response = {
          ErrorStatus: 'DestinyAccountNotFound'
        }

        mockHttp.get('/Destiny2/1/Profile/membership-id?components=100').reply(200, response)
      })

      it('throws a not found error', async () => {
        try {
          await subject.getProfile('membership-id')
        } catch (error) {
          expect(error.message).toEqual('Not found')
          expect(error.status).toEqual(404)
        }
      })
    })
  })
})
