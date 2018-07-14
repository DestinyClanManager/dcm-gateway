describe('member-handler', () => {
  let subject, groupService, registryService, activityService, destinyService
  beforeEach(() => {
    registryService = td.replace('./src/services/registry-service')
    groupService = td.replace('./src/services/group-service')
    activityService = td.replace('./src/services/activity-service')
    destinyService = td.replace('./src/services/destiny-service')
    subject = require('./member-handler')
  })

  describe('getAdminStatus', () => {
    describe('when the member is not a clan admin', () => {
      let actual

      beforeEach(async () => {
        const response = [
          {
            member: {
              memberType: 2,
              groupId: 'clan-1',
              bungieNetUserInfo: {},
              destinyUserInfo: {}
            },
            group: {
              groupId: 'clan-1'
            }
          }
        ]
        td.when(groupService.getMemberDetails('non-membership-id')).thenResolve(response)
        actual = await subject.getAdminStatus('non-membership-id')
      })

      afterEach(() => {
        td.reset()
      })

      it('does not fetch registered clans', () => {
        td.verify(registryService.getRegisteredClans(), { times: 0 })
      })

      it('does not register the clan', () => {
        td.verify(registryService.registerClan('clan-1'), { times: 0 })
      })

      it('returns an empty list', () => {
        expect(actual).toEqual([])
      })
    })

    describe('when the member is an admin for 1 or more clans', () => {
      beforeEach(() => {
        const response = [
          {
            member: {
              memberType: 3,
              groupId: 'clan-1',
              bungieNetUserInfo: {},
              destinyUserInfo: {}
            },
            group: {
              groupId: 'clan-1'
            }
          },
          {
            member: {
              memberType: 3,
              groupId: 'clan-2',
              bungieNetUserInfo: {},
              destinyUserInfo: {}
            },
            group: {
              groupId: 'clan-2'
            }
          }
        ]
        td.when(groupService.getMemberDetails('membership-id')).thenResolve(response)
      })

      afterEach(() => {
        td.reset()
      })

      describe(`when none of the member's clan are registered`, () => {
        let actual

        beforeEach(async () => {
          td.when(registryService.getRegisteredClans()).thenResolve([])
          actual = await subject.getAdminStatus('membership-id')
        })

        afterEach(() => {
          td.reset()
        })

        it(`registers the member's clans`, () => {
          td.verify(registryService.registerClan('clan-1'))
          td.verify(registryService.registerClan('clan-2'))
        })

        it('starts generating the activity report', () => {
          td.verify(activityService.startActivityReport('clan-1'))
          td.verify(activityService.startActivityReport('clan-2'))
        })

        it('returns the list of groups', () => {
          expect(actual[0].groupId).toEqual('clan-1')
          expect(actual[1].groupId).toEqual('clan-2')
        })
      })

      describe(`when 1 or more of the member's clan are not registered`, () => {
        let actual

        beforeEach(async () => {
          td.when(registryService.getRegisteredClans()).thenResolve(['clan-1'])
          actual = await subject.getAdminStatus('membership-id')
        })

        afterEach(() => {
          td.reset()
        })

        it('registers the unregistered clans', () => {
          td.verify(registryService.registerClan('clan-1'), { times: 0 })
          td.verify(registryService.registerClan('clan-2'))
        })

        it('returns the list of groups', () => {
          expect(actual[0].groupId).toEqual('clan-1')
          expect(actual[1].groupId).toEqual('clan-2')
        })
      })
    })
  })

  describe('getCharacters', () => {
    let actual

    beforeEach(async () => {
      td.when(destinyService.getMemberCharacters('membership-type', 'membership-id')).thenResolve('characters')
      actual = await subject.getCharacters('membership-type', 'membership-id')
    })

    it('returns the characters', () => {
      expect(actual).toEqual('characters')
    })
  })

  describe('getExpansions', () => {
    describe('when all expansions are known', () => {
      beforeEach(async () => {
        td.when(destinyService.getProfile('membership-type', 'membership-id')).thenResolve({
          data: { versionsOwned: 3 }
        })
      })

      afterEach(() => {
        td.reset()
      })

      it('maps versions owned to expansions', async () => {
        expect(await subject.getExpansions('membership-type', 'membership-id')).toEqual(['Destiny 2', 'Curse of Osiris', 'Warmind'])
      })
    })

    describe('when new expansions are released', () => {
      beforeEach(async () => {
        td.when(destinyService.getProfile('membership-type', 'membership-id')).thenResolve({
          data: { versionsOwned: 10 }
        })
      })

      afterEach(() => {
        td.reset()
      })

      it('returns the known expansions', async () => {
        expect(await subject.getExpansions('membership-type', 'membership-id')).toEqual(['Destiny 2', 'Curse of Osiris', 'Warmind'])
      })
    })
  })
})
