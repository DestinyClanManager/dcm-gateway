import nock from 'nock'

describe('registry-service', () => {
  let subject, mockHttp

  beforeEach(() => {
    mockHttp = nock('http://registry-url')
    subject = require('./registry-service')
  })

  describe('getRegisteredClans', () => {
    let actual

    beforeEach(async () => {
      mockHttp.get('/').reply(200, ['clan-1', 'clan-2'])
      actual = await subject.getRegisteredClans()
    })

    it('returns the registered clans', () => {
      expect(actual).toEqual(['clan-1', 'clan-2'])
    })
  })

  describe('registerClan', () => {
    let actual

    beforeEach(async () => {
      mockHttp.post('/').reply(201, { id: 'clan-id' })
      actual = await subject.registerClan('clan-id')
    })

    it('returns the registered clan id', () => {
      expect(actual).toEqual({ id: 'clan-id' })
    })
  })
})
