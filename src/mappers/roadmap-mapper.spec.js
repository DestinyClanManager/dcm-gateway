describe('roadmap-mapper', () => {
  let subject

  beforeEach(() => {
    subject = require('./roadmap-mapper')
  })

  describe('mapCardToRoadmapItem', () => {
    let actual

    beforeEach(() => {
      const card = {
        name: 'card-name',
        pos: 1234.5,
        labels: [{ name: 'Feature' }]
      }
      actual = subject.mapCardToRoadmapItem(card)
    })

    it('maps the trello response to a roadmap response', () => {
      const expected = {
        name: 'card-name',
        pos: 1234.5,
        type: 'feature'
      }
      expect(actual).toEqual(expected)
    })
  })

  describe('mapListToTimeline', () => {
    let actual

    beforeEach(() => {
      const list = {
        name: 'list-name',
        cards: [{ name: 'card-1', pos: 1234.5 }, { name: 'card-2', pos: 431 }, { name: 'card-3', pos: 1203456789 }]
      }

      actual = subject.mapListToTimeline(list)
    })

    it('returns a the cards in asc order by pos', () => {
      expect(actual).toEqual([{ name: 'card-2', pos: 431 }, { name: 'card-1', pos: 1234.5 }, { name: 'card-3', pos: 1203456789 }])
    })
  })
})
