import { getHashName } from './milestone-hash-mapper'

const thisWeeksMilestones = 1064137897

export function map(rewardState) {
  console.log('reward state', rewardState)
  const mappedRewardState = {
    startDate: rewardState.startDate,
    endDate: rewardState.endDate,
    milestones: []
  }

  const rewards = rewardState.rewards.find(r => r.rewardCategoryHash === thisWeeksMilestones).entries
  console.log('rewards', rewards)
  if (rewards) {
    rewards.forEach(reward => {
      let milestone = {
        name: getHashName(reward.rewardEntryHash),
        earned: reward.earned
      }

      mappedRewardState.milestones.push(milestone)
    })
  }

  console.log('mapped rewards:', mappedRewardState)

  return mappedRewardState
}
