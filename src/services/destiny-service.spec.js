describe('destiny service', () => {
  let subject, rp

  beforeEach(() => {
    rp = td.replace('request-promise')
    subject = require('./destiny-service')
  })

  describe('getProfile', () => {
    describe('when the member profile is not found', () => {
      beforeEach(async () => {
        const request = {
          uri: 'bungie-base-url/Destiny2/1/Profile/membership-id?components=100',
          headers: {
            'X-API-Key': 'api-key'
          },
          json: true
        }

        const response = {
          ErrorCode: 1601,
          ThrottleSeconds: 0,
          ErrorStatus: 'DestinyAccountNotFound',
          Message: 'We were unable to find your Destiny account information. If you have a valid Destiny Account, let us know.',
          MessageData: {}
        }
        td.when(rp(request)).thenResolve(response)
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
