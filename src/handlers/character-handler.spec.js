const td = global.td

describe.only('character-handler', () => {
  let destinyService, subject
  beforeEach(() => {
    destinyService = td.replace('./src/services/destiny-service')
    subject = require('./character-handler')
  })

  describe('getCharacterActivity', () => {
    let actual
    beforeEach(async () => {
      td.when(destinyService.getMemberCharacterActivity('membership-type', 'membership-id', 'character-id')).thenReturn('the-character-activity')

      actual = await subject.getCharacterActivity('membership-type', 'membership-id', 'character-id')
    })

    test('getCharacterActivity returns the response', async () => {
      expect(actual).toEqual('the-character-activity')
    })
  })
})
