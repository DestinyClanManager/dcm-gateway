describe('requirement handler', () => {
  let requirementService, subject

  beforeEach(() => {
    requirementService = td.replace('./src/services/requirement-service')
    subject = require('./requirement-handler')
  })

  describe('createRequirementForClan', () => {
    let actual

    beforeEach(async () => {
      const expectedRequirement = {
        clanId: 'clan-id',
        type: 'type',
        value: 'value'
      }
      td.when(requirementService.createClanRequirement(expectedRequirement)).thenResolve('created-requirement')

      const requirement = {
        type: 'type',
        value: 'value'
      }
      actual = await subject.createRequirementForClan('clan-id', requirement)
    })

    it('returns the created requirement', () => {
      expect(actual).toEqual('created-requirement')
    })
  })

  describe('getRequirementsForClan', () => {
    let actual

    beforeEach(async () => {
      td.when(requirementService.getClanRequirementsByClanId('clan-id')).thenResolve('the-requirements')

      actual = await subject.getRequirementsForClan('clan-id')
    })

    it('returns the requirements for the given clan', () => {
      expect(actual).toEqual('the-requirements')
    })
  })
})
