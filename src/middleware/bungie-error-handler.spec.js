import * as subject from './bungie-error-handler'

describe('bungie error handler', () => {
  describe('Unauthorized', () => {
    it('throws an unauthorized error', () => {
      expect(() => subject.checkError({ ErrorCode: 99 })).toThrow('Unauthorized')
      expect(() => subject.checkError({ ErrorCode: 10 })).toThrow('Unauthorized')
      expect(() => subject.checkError({ ErrorCode: 12 })).toThrow('Unauthorized')
    })
  })

  describe('Not Found', () => {
    it('throws a not found error', () => {
      expect(() => subject.checkError({ ErrorCode: 11 })).toThrow('Not Found')
      expect(() => subject.checkError({ ErrorCode: 21 })).toThrow('Not Found')
      expect(() => subject.checkError({ ErrorCode: 103 })).toThrow('Not Found')
      expect(() => subject.checkError({ ErrorCode: 116 })).toThrow('Not Found')
      expect(() => subject.checkError({ ErrorCode: 165 })).toThrow('Not Found')
      expect(() => subject.checkError({ ErrorCode: 611 })).toThrow('Not Found')
      expect(() => subject.checkError({ ErrorCode: 622 })).toThrow('Not Found')
      expect(() => subject.checkError({ ErrorCode: 686 })).toThrow('Not Found')
      expect(() => subject.checkError({ ErrorCode: 688 })).toThrow('Not Found')
      expect(() => subject.checkError({ ErrorCode: 1601 })).toThrow('Not Found')
      expect(() => subject.checkError({ ErrorCode: 1620 })).toThrow('Not Found')
    })
  })

  describe('Bad Request', () => {
    it('throw a bad request error', () => {
      expect(() => subject.checkError({ ErrorCode: 9 })).toThrow('Bad Request')
    })
  })

  describe('Server Error', () => {
    describe('when the error matches a more specific error', () => {
      it('throw the more specific error', () => {
        expect(() => subject.checkError({ ErrorCode: 9 })).toThrow('Bad Request')
        expect(() => subject.checkError({ ErrorCode: 11 })).toThrow('Not Found')
        expect(() => subject.checkError({ ErrorCode: 99 })).toThrow('Unauthorized')
      })
    })

    describe('when the error is not defined elsewhere', () => {
      it('throw a server error', () => {
        expect(() => subject.checkError({ ErrorCode: 102 })).toThrow('Server Error')
      })
    })
  })

  describe('no error', () => {
    it('returns the bungie response', () => {
      expect(() => subject.checkError({ ErrorCode: 1 })).not.toThrow()
      const bungieResponse = { ErrorCode: 1 }
      expect(subject.checkError(bungieResponse)).toEqual(bungieResponse)
    })
  })
})
