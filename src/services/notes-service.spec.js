describe('notes service', () => {
  let subject, rp

  beforeEach(() => {
    rp = td.replace('request-promise')
    subject = require('./notes-service')
  })

  describe('getNotesForMember', () => {
    beforeEach(() => {
      const request = {
        uri: 'notes-url/clan-id/membership-id',
        json: true
      }
      td.when(rp(request)).thenResolve('the-notes')
    })

    it('resolve with the fetched notes', done => {
      subject.getNotesForMember('clan-id', 'membership-id').then(response => {
        expect(response).toEqual('the-notes')
        done()
      })
    })
  })

  describe('addNoteForMember', () => {
    beforeEach(() => {
      const request = {
        uri: 'notes-url/clan-id/membership-id',
        body: 'the-created-note',
        json: true,
        method: 'POST'
      }
      td.when(rp(request)).thenResolve('the-created-note')
    })

    it('resolves with the created note', done => {
      subject.addNoteForMember('clan-id', 'membership-id', 'the-created-note').then(response => {
        expect(response).toEqual('the-created-note')
        done()
      })
    })
  })
})
