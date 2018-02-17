import moment from 'moment-timezone'

export function makeActivityByDate(activities) {
  let activityDates = []
  activities.forEach(activity => {
    const activityMoment = moment(activity.period)
    if (activityDates.find(d => d.month() === activityMoment.month() && d.date() === activityMoment.date() && d.year() === activityMoment.year()) === undefined) {
      activityDates.push(activityMoment)
    }
  })

  activityDates = activityDates.sort((a, b) => a - b)

  const startDate = activityDates[0]
  const endDate = activityDates[activityDates.length - 1]

  const days = endDate.diff(startDate, 'd', false)

  const dates = {}
  dates[startDate.format('MM/DD/YYYY')] = 0
  for (let i = 1; i <= days + 1; i++) {
    dates[startDate.add(1, 'd').format('MM/DD/YYYY')] = 0
  }

  activities.forEach(activity => {
    const activityDate = moment
      .utc(activity.period)
      .tz('America/New_York')
      .format('MM/DD/YYYY')
    if (dates[activityDate] !== undefined) {
      dates[activityDate]++
    }
  })

  return dates
}
