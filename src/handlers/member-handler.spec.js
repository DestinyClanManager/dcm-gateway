const td = global.td

describe('member-handler', () => {
  let subject, groupService
  beforeEach(() => {
    groupService = td.replace('./src/services/group-service')
    subject = require('./member-handler')
  })

  describe('getAdminStatus', () => {
    let actual

    beforeEach(async () => {
      const response = [
        {
          member: {
            memberType: 3,
            isOnline: false,
            groupId: '1789424',
            destinyUserInfo: {
              membershipType: 1,
              membershipId: '4611686018458918179',
              displayName: 'heymrcarter014'
            },
            bungieNetUserInfo: {
              membershipType: 254,
              membershipId: '14485300',
              displayName: 'heymrcarter014'
            },
            joinDate: '2017-03-09T01:38:47Z'
          },
          group: {
            groupId: '1789424',
            name: 'Unity Of Guardians UOFGX',
            groupType: 1
          }
        }
      ]
      td.when(groupService.getMemberDetails('membership-id')).thenResolve(response)
      actual = await subject.getAdminStatus('membership-type', 'membership-id')
    })

    it('returns a list of groups the membership id is an admin of', () => {
      const expected = [
        {
          bungieNetUserInfo: {
            membershipType: 254,
            membershipId: '14485300',
            displayName: 'heymrcarter014'
          },
          platformUserInfo: {
            membershipType: 1,
            membershipId: '4611686018458918179',
            displayName: 'heymrcarter014'
          },
          groupId: '1789424',
          groupName: 'Unity Of Guardians UOFGX',
          isAdmin: true,
          memberType: 3
        }
      ]

      expect(actual).toEqual(expected)
    })
  })
})
