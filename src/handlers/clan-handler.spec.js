describe('Name of the group', () => {
  let subject, groupService, destinyService, notesService

  beforeEach(() => {
    groupService = td.replace('./src/services/group-service')
    destinyService = td.replace('./src/services/destiny-service')
    notesService = td.replace('./src/services/notes-service')
    subject = require('./clan-handler')
  })

  describe('getInactiveMembers', () => {
    describe('when a member does not have a destiny profile', () => {
      beforeEach(() => {
        const rosterResponse = [
          {
            destinyUserInfo: { membershipId: 'not-found-membership-id' }
          },
          {
            destinyUserInfo: { membershipId: 'membership-id' }
          }
        ]
        const memberNotFoundError = new Error('Not found')
        memberNotFoundError.status = 404
        td.when(groupService.getMembersOfGroup('clan-id')).thenResolve(rosterResponse)
        td.when(destinyService.getProfile('not-found-membership-id')).thenReject(memberNotFoundError)
        td.when(destinyService.getProfile('membership-id')).thenResolve({
          gamertag: 'gamertag',
          daysSinceLastPlayed: 1
        })
      })

      it('ignores the not found profile and returns the profiles it did find', async () => {
        const actual = await subject.getInactiveMembers('clan-id')
        expect(actual).toEqual([
          {
            gamertag: 'gamertag',
            daysSinceLastPlayed: 1
          }
        ])
      })
    })
  })

  describe('addNoteForMember', () => {
    beforeEach(() => {
      td.when(notesService.addNoteForMember('clan-id', 'membership-id', 'note')).thenResolve('created-note')
    })

    it('returns the created note', async () => {
      let actual = await subject.addNoteForMember('clan-id', 'membership-id', 'note')
      expect(actual).toEqual('created-note')
    })
  })

  describe('getNotesForMember', () => {
    beforeEach(() => {
      td.when(notesService.getNotesForMember('clan-id', 'membership-id')).thenResolve('notes')
    })

    it('returns the fetched notes', async () => {
      let actual = await subject.getNotesForMember('clan-id', 'membership-id')
      expect(actual).toEqual('notes')
    })
  })
})
