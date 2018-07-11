describe('milestoneHashMapper', () => {
  let subject

  beforeEach(() => {
    subject = require('./milestone-hash-mapper')
  })

  describe('getHashName', () => {
    it('maps the crucible milestone', () => {
      expect(subject.getHashName('964120289')).toEqual('Crucible')
    })

    it('maps the crucible milestone', () => {
      expect(subject.getHashName('2043403989')).toEqual('Raid')
    })

    it('maps the crucible milestone', () => {
      expect(subject.getHashName('2112637710')).toEqual('Trials of the Nine')
    })

    it('maps the crucible milestone', () => {
      expect(subject.getHashName('3789021730')).toEqual('Nightfall')
    })

    it('throws an error when an unknown hash is provided', () => {
      expect(() => subject.getHashName('hash')).toThrowError('Unknown milestone hash')
    })
  })
})
