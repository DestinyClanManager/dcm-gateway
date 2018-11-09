import nock from 'nock'
import { utc } from 'moment'

describe('requirement service', () => {
  let mockHttp, subject

  beforeEach(() => {
    mockHttp = nock('http://requirements-url')
    subject = require('./requirement-service')
  })

  describe('createClanRequirement', () => {
    let actual

    describe('when the request is successful', () => {
      beforeEach(async () => {
        const requirement = {
          clanId: 'clan-id',
          type: 'type',
          value: 'value'
        }
        const requestBody = requirement
        mockHttp.post('/', requestBody).reply(200, 'created-requirement')

        actual = await subject.createClanRequirement(requirement)
      })

      it('returns the created requirement', () => {
        expect(actual).toEqual('created-requirement')
      })
    })

    describe('when the request fails', () => {
      beforeEach(async () => {
        const body = {
          type: 'type',
          value: 'value'
        }
        mockHttp.post('/', body).reply(500, 'the-error-response')

        try {
          await subject.createClanRequirement(body)
        } catch (error) {
          actual = error
        }
      })

      it('returns the error', () => {
        expect(actual.message).toContain('the-error-response')
      })
    })
  })

  describe('getClanRequirementsByClanId', () => {
    let actual

    describe('when the request is successful', () => {
      beforeEach(async () => {
        mockHttp.get('/?clanId=clan-id').reply(200, 'the-requirements')
        actual = await subject.getClanRequirementsByClanId('clan-id')
      })

      it(`returns the clan's requirements`, () => {
        expect(actual).toEqual('the-requirements')
      })
    })

    describe('when the request fails', () => {
      beforeEach(async () => {
        mockHttp.get('/?clanId=clan-id').reply(500, 'the-error')

        try {
          await subject.getClanRequirementsByClanId('clan-id')
        } catch (error) {
          actual = error
        }
      })

      it('returns the error', () => {
        expect(actual.message).toContain('the-error')
      })
    })
  })
})
