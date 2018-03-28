const td = global.td

describe('member-handler', () => {
  let subject, groupService, registryService
  beforeEach(() => {
    registryService = td.replace('./src/services/registry-service')
    groupService = td.replace('./src/services/group-service')
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
        actual = await subject.getAdminStatus('membership-type', 'non-membership-id')
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
          actual = await subject.getAdminStatus('membership-type', 'membership-id')
        })

        afterEach(() => {
          td.reset()
        })

        it(`registers the member's clans`, () => {
          td.verify(registryService.registerClan('clan-1'))
          td.verify(registryService.registerClan('clan-2'))
        })

        it('returns the list of groups', () => {
          expect(actual[0].groupId).toEqual('clan-1')
          expect(actual[1].groupId).toEqual('clan-2')
        })
      })

      describe(`when 1 or more of the member's clan are registered`, () => {
        let actual

        beforeEach(async () => {
          td.when(registryService.getRegisteredClans()).thenResolve(['clan-1'])
          actual = await subject.getAdminStatus('membership-type', 'membership-id')
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
})
