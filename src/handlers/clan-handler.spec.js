describe('clan handler', () => {
  let subject, notesService, activityService, groupService

  beforeEach(() => {
    notesService = td.replace('./src/services/notes-service')
    activityService = td.replace('./src/services/activity-service')
    groupService = td.replace('./src/services/group-service')
    subject = require('./clan-handler')
  })

  describe('getInactiveMembers', () => {
    let actual

    beforeEach(async () => {
      const profiles = [{ daysSinceLastPlayed: 10 }, { daysSinceLastPlayed: 40 }, { daysSinceLastPlayed: 1 }, { daysSinceLastPlayed: 100 }, { daysSinceLastPlayed: 87 }]
      td.when(activityService.getActivity('clan-id')).thenResolve(profiles)
      actual = await subject.getInactiveMembers('clan-id')
    })

    it('returns the activity service response', () => {
      const expected = [{ daysSinceLastPlayed: 100 }, { daysSinceLastPlayed: 87 }, { daysSinceLastPlayed: 40 }, { daysSinceLastPlayed: 10 }, { daysSinceLastPlayed: 1 }]
      expect(actual).toEqual(expected)
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

  describe('invite', () => {
    let membership

    beforeEach(() => {
      membership = {
        id: 'membership-id',
        type: 'membership-type'
      }
      td.when(groupService.inviteMemberToGroup('clan-id', membership, 'message', 'auth-token')).thenResolve({ membershipId: 'membership-id', resolveState: 0 })
    })

    it('returns the invite result', async () => {
      const actual = await subject.invite('clan-id', membership, 'message', 'auth-token')
      expect(actual).toEqual({ membershipId: 'membership-id', resolveState: 0 })
    })
  })

  describe('kickMember', () => {
    let actual

    beforeEach(async () => {
      td.when(groupService.kickMemberFromGroup('clan-id', 'membership-type', 'membership-id', 'bearer-token')).thenResolve('result')

      actual = await subject.kickMember('clan-id', 'membership-type', 'membership-id', 'bearer-token')
    })

    it('returns the result', () => {
      expect(actual).toEqual('result')
    })
  })

  describe('rescindInvitation', () => {
    let actual

    beforeEach(async () => {
      td.when(groupService.cancelGroupInvite('clan-id', 'membership-type', 'membership-id', 'bearer-token')).thenResolve('result')

      actual = await subject.rescindInvitation('clan-id', 'membership-type', 'membership-id', 'bearer-token')
    })

    it('returns the result', () => {
      expect(actual).toEqual('result')
    })
  })

  describe('changeMemberType', () => {
    beforeEach(async () => {
      const membership = {
        membershipId: 'membership-id',
        membershipType: 'membership-type',
        memberType: 'member-type'
      }

      await subject.changeMemberType('clan-id', membership, 'bearer-token')
    })

    it('calls the changeMemberType method', () => {
      td.verify(groupService.changeMemberType('clan-id', 'membership-type', 'membership-id', 'member-type', 'bearer-token'))
    })
  })

  describe('getBannedMembers', () => {
    let actual

    beforeEach(async () => {
      td.when(groupService.getBannedMembersOfGroup('clan-id', 'auth-token')).thenResolve('banned-members')
      actual = await subject.getBannedMembers('clan-id', 'auth-token')
    })

    it('returns the banned members', () => {
      expect(actual).toEqual('banned-members')
    })
  })
})
