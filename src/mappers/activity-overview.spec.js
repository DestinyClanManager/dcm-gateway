import * as subject from './activity-overview'

describe('activity overview mapper', () => {
  let actual

  beforeEach(() => {
    const historicalStats = {
      allPvP: {
        allTime: {
          activitiesEntered: {
            basic: {
              displayValue: '400'
            }
          },
          activitiesWon: {
            basic: {
              displayValue: '100'
            }
          },
          kills: {
            basic: {
              displayValue: '200'
            },
            pga: {
              displayValue: '12.1'
            }
          },
          deaths: {
            basic: {
              displayValue: '125'
            },
            pga: {
              displayValue: '18.2'
            }
          },
          killsDeathsRatio: {
            basic: {
              displayValue: '1.0'
            }
          },
          killsDeathsAssists: {
            basic: {
              displayValue: '1.5'
            }
          },
          averageLifespan: {
            basic: {
              displayValue: '0m 45s'
            }
          },
          combatRating: {
            basic: {
              displayValue: '149'
            }
          },
          efficiency: {
            basic: {
              displayValue: '1.1'
            }
          }
        }
      },
      patrol: {
        allTime: {
          heroicPublicEventsCompleted: {
            basic: {
              displayValue: '300'
            }
          },
          publicEventsCompleted: {
            basic: {
              displayValue: '500'
            }
          },
          adventuresCompleted: {
            basic: {
              displayValue: '144'
            }
          }
        }
      },
      raid: { allTime: {} },
      story: { allTime: {} },
      allStrikes: { allTime: {} }
    }
    actual = subject.map(historicalStats)
  })

  it('returns an array of stats for each activity', () => {
    expect(actual[0].name).toEqual('crucible')
    expect(Array.isArray(actual[0].stats)).toBe(true)

    expect(actual[1].name).toEqual('patrol')
    expect(Array.isArray(actual[1].stats)).toBe(true)

    expect(actual[2].name).toEqual('raid')
    expect(Array.isArray(actual[2].stats)).toBe(true)

    expect(actual[3].name).toEqual('story')
    expect(Array.isArray(actual[3].stats)).toBe(true)

    expect(actual[4].name).toEqual('strikes')
    expect(Array.isArray(actual[4].stats)).toBe(true)
  })

  describe('crucible stats', () => {
    let actualStats

    beforeEach(() => {
      actualStats = actual[0].stats
    })

    it('includes the kills/deaths ratio', () => {
      const kd = actualStats.find(s => s.name === 'Kills/Deaths')
      expect(kd.value).toEqual('1.0')
    })

    it('includes the kills/deaths/assists ratio', () => {
      const kda = actualStats.find(s => s.name === 'Kills/Deaths/Assists')
      expect(kda.value).toEqual('1.5')
    })

    it('includes the number of kills', () => {
      const kills = actualStats.find(s => s.name === 'Kills')
      expect(kills.value).toEqual('200')
    })

    it('includes the number of kills per game', () => {
      const kills = actualStats.find(s => s.name === 'Kills/Game')
      expect(kills.value).toEqual('12.1')
    })

    it('includes the number of deaths', () => {
      const deaths = actualStats.find(s => s.name === 'Deaths')
      expect(deaths.value).toEqual('125')
    })

    it('includes the number of deaths per game', () => {
      const deaths = actualStats.find(s => s.name === 'Deaths/Game')
      expect(deaths.value).toEqual('18.2')
    })

    it('includes the number of matches entered', () => {
      const entered = actualStats.find(s => s.name === 'Matches Entered')
      expect(entered.value).toEqual('400')
    })

    it('includes the number of matches won', () => {
      const won = actualStats.find(s => s.name === 'Matches Won')
      expect(won.value).toEqual('100')
    })

    it('includes the average lifespan', () => {
      const lifespan = actualStats.find(s => s.name === 'Average Lifespan')
      expect(lifespan.value).toEqual('0m 45s')
    })

    it('includes the combat rating', () => {
      const rating = actualStats.find(s => s.name === 'Combat Rating')
      expect(rating.value).toEqual('149')
    })

    it('includes the efficiency', () => {
      const rating = actualStats.find(s => s.name === 'Efficiency')
      expect(rating.value).toEqual('1.1')
    })
  })

  describe('patrol stats', () => {
    let actualStats

    beforeEach(() => {
      actualStats = actual[1].stats
    })

    it('includes heroic public events', () => {
      const heroicEvents = actualStats.find(s => s.name === 'Heroic Public Events Completed')
      expect(heroicEvents.value).toEqual('300')
    })

    it('includes public events', () => {
      const events = actualStats.find(s => s.name === 'Public Events Completed')
      expect(events.value).toEqual('500')
    })

    it('includes adventures', () => {
      const adventures = actualStats.find(s => s.name === 'Adventures Completed')
      expect(adventures.value).toEqual('144')
    })
  })
})
