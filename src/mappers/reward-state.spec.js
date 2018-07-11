import * as subject from './reward-state'

describe('reward state mapper', () => {
  let actual

  beforeEach(() => {
    const rewardState = {
      startDate: '2018-07-03',
      endDate: '2018-07-10',
      rewards: [
        {
          rewardCategoryHash: 1064137897,
          entries: [
            {
              rewardEntryHash: 3789021730,
              earned: true,
              redeemed: false
            },
            {
              rewardEntryHash: 2112637710,
              earned: false,
              redeemed: false
            },
            {
              rewardEntryHash: 2043403989,
              earned: true,
              redeemed: false
            },
            {
              rewardEntryHash: 964120289,
              earned: true,
              redeemed: false
            }
          ]
        },
        {
          rewardCategoryHash: 'another-hash',
          entries: ['the', 'entries']
        }
      ]
    }
    actual = subject.map(rewardState)
  })

  it('maps a bungie reward state to weekly clan milestones', () => {
    const expected = {
      startDate: '2018-07-03',
      endDate: '2018-07-10',
      milestones: [
        {
          name: 'Nightfall',
          earned: true
        },
        {
          name: 'Trials of the Nine',
          earned: false
        },
        {
          name: 'Raid',
          earned: true
        },
        {
          name: 'Crucible',
          earned: true
        }
      ]
    }

    expect(actual).toEqual(expected)
  })
})
