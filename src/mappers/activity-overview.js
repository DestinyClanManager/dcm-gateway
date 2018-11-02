const interestingStats = {
  allPvP: {
    basic: ['kills', 'killsDeathsRatio', 'killsDeathsAssists', 'deaths', 'activitiesEntered', 'activitiesWon', 'averageLifespan', 'combatRating', 'efficiency'],
    pga: ['kills', 'deaths']
  },
  patrol: {
    basic: ['kills', 'killsDeathsRatio', 'killsDeathsAssists', 'deaths', 'heroicPublicEventsCompleted', 'adventuresCompleted', 'publicEventsCompleted', 'activitiesEntered'],
    pga: ['kills', 'deaths']
  },
  raid: {
    basic: ['activitiesEntered', 'activitiesCleared', 'kills', 'deaths', 'averageLifespan', 'efficiency', 'killsDeathsRatio', 'killsDeathsAssists'],
    pga: ['kills', 'deaths']
  },
  story: {
    basic: ['activitiesEntered', 'activitiesCleared', 'kills', 'deaths', 'averageLifespan', 'efficiency', 'killsDeathsRatio', 'killsDeathsAssists'],
    pga: ['kills', 'deaths']
  },
  allStrikes: {
    basic: ['activitiesEntered', 'activitiesCleared', 'kills', 'deaths', 'averageLifespan', 'efficiency', 'killsDeathsRatio', 'killsDeathsAssists'],
    pga: ['kills', 'deaths']
  },
  pvecomp_gambit: {
    basic: [
      'activitiesEntered',
      'activitiesWon',
      'averageLifespan',
      'killsDeathsRatio',
      'killsDeathsAssists',
      'efficiency',
      'winLossRatio',
      'invasions',
      'invasionKills',
      'invaderKills',
      'invaderDeaths',
      'primevalKills',
      'blockerKills',
      'motesPickedUp',
      'motesDeposited',
      'motesDenied',
      'motesLost'
    ],
    pga: ['kills', 'deaths']
  }
}

function activityKeyToName(key) {
  if (key === 'allPvP') {
    return 'crucible'
  }

  if (key === 'allStrikes') {
    return 'strikes'
  }

  if (key === 'pvecomp_gambit') {
    return 'gambit'
  }

  return key
}

function statKeyToName(stat) {
  if (stat === 'killsDeathsRatio') {
    return 'Kills/Deaths'
  }

  if (stat === 'killsDeathsAssists') {
    return 'Kills/Deaths/Assists'
  }

  if (stat === 'activitiesEntered') {
    return 'Activities Entered'
  }

  if (stat === 'activitiesCleared') {
    return 'Activities Cleared'
  }

  if (stat === 'activitiesWon') {
    return 'Activities Won'
  }

  if (stat === 'averageLifespan') {
    return 'Average Lifespan'
  }

  if (stat === 'combatRating') {
    return 'Combat Rating'
  }

  if (stat === 'heroicPublicEventsCompleted') {
    return 'Heroic Public Events Completed'
  }

  if (stat === 'publicEventsCompleted') {
    return 'Public Events Completed'
  }

  if (stat === 'adventuresCompleted') {
    return 'Adventures Completed'
  }

  if (stat === 'invasionKills') {
    return 'Invasion Kills'
  }

  if (stat === 'invaderKills') {
    return 'Invader Kills'
  }

  if (stat === 'invaderDeaths') {
    return 'Invader Deaths'
  }

  if (stat === 'primevalKills') {
    return 'Primeval Kills'
  }

  if (stat === 'blockerKills') {
    return 'Blocker Kills'
  }

  if (stat === 'motesPickedUp') {
    return 'Motes Picked Up'
  }

  if (stat === 'motesDenied') {
    return 'Motes Denied'
  }

  if (stat === 'motesLost') {
    return 'Motes Lost'
  }

  if (stat === 'motesDeposited') {
    return 'Motes Deposited'
  }

  if (stat === 'winLossRatio') {
    return 'Win Loss Ratio'
  }

  return `${stat.substring(0, 1).toUpperCase()}${stat.substring(1)}`
}

function weaponUtilizationKeyToWeapon(key) {
  const weaponType = key.substring(11)
  return weaponType.replace(/([A-Z])/g, ' $1').trim()
}

function isInterestingStat(activity, stat, statType) {
  return interestingStats[activity][statType].includes(stat)
}

function isPlayTimeKey(key) {
  return key === 'secondsPlayed'
}

function isWeaponUtilizationKey(key) {
  return key.startsWith('weaponKills')
}

function initialCap(string) {
  return `${string.substring(0, 1).toUpperCase()}${string.substring(1)}`
}

export function map(historicalStats) {
  const activityStats = []
  const activityPlayTime = []
  let weaponUtilization = {}

  Object.keys(historicalStats).forEach(key => {
    const activityName = activityKeyToName(key)
    const stats = []
    Object.keys(historicalStats[key].allTime).forEach(statKey => {
      if (isPlayTimeKey(statKey)) {
        const playTimeStat = []
        playTimeStat.push(initialCap(activityName))
        playTimeStat.push(Math.floor(historicalStats[key].allTime[statKey].basic.value / 60 / 60))

        activityPlayTime.push(playTimeStat)
      }

      if (isWeaponUtilizationKey(statKey)) {
        const weaponType = weaponUtilizationKeyToWeapon(statKey)
        if (!weaponUtilization[weaponType]) {
          weaponUtilization[weaponType] = 0
        }

        weaponUtilization[weaponType] += historicalStats[key].allTime[statKey].basic.value
      }

      if (isInterestingStat(key, statKey, 'basic')) {
        const stat = {
          name: statKeyToName(statKey),
          value: historicalStats[key].allTime[statKey].basic.displayValue
        }

        stats.push(stat)
      }

      if (isInterestingStat(key, statKey, 'pga')) {
        let activityUnit = initialCap(activityName)
        if (activityName === 'crucible' || activityName === 'gambit') {
          activityUnit = 'Match'
        }

        const stat = {
          name: `${statKeyToName(statKey)}/${activityUnit}`,
          value: historicalStats[key].allTime[statKey].pga.displayValue
        }

        stats.push(stat)
      }
    })

    activityStats.push({
      name: activityName,
      stats
    })
  })

  weaponUtilization = Object.entries(weaponUtilization).map(weapon => weapon)

  return { activityPlayTime, activityStats, weaponUtilization }
}
