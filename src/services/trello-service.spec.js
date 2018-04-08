import nock from 'nock'

describe('trello-service', () => {
  let mockHttp, subject

  beforeEach(() => {
    mockHttp = nock('http://trello-url')
    subject = require('./trello-service')
  })

  describe('getCardsFromBoard', () => {
    let actual

    beforeEach(async () => {
      mockHttp.get('/boards/board-id/lists?cards=all&key=trello-api-key&token=trello-token').reply(200, 'the-response')
      actual = await subject.getCardsFromBoard('board-id')
    })

    it('returns the trello response', () => {
      expect(actual).toEqual('the-response')
    })
  })
})
