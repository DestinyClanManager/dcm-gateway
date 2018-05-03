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

  describe('addCardToBoard', () => {
    let actual

    beforeEach(async () => {
      mockHttp.post('/cards?idList=list-id&name=card-name&desc=card-desc&pos=bottom&key=trello-api-key&token=trello-token').reply(200, 'response')

      const card = {
        name: 'card-name',
        desc: 'card-desc',
        pos: 'bottom'
      }
      actual = await subject.addCardToBoard('list-id', card)
    })

    it('returns the trello response', () => {
      expect(actual).toEqual('response')
    })
  })
})
