import { getCardsFromBoard, addCardToBoard } from '../services/trello-service'

export async function getRoadmap() {
  const board = await getCardsFromBoard(process.env.TRELLO_BOARD_ID)

  const inProgress = board.find(b => b.name === 'In Progress')
  const inProgressItems = inProgress.cards.filter(c => c.labels[0] && c.labels[0].name !== 'Chore').map(card => {
    return {
      name: card.name,
      type: card.labels[0].name.toLowerCase(),
      shortUrl: card.shortUrl
    }
  })

  const planned = board.find(b => b.name === 'Backlog')
  const plannedItems = planned.cards.filter(c => c.labels[0] && c.labels[0].name !== 'Chore').map(c => {
    return {
      name: c.name,
      type: c.labels[0].name.toLowerCase(),
      shortUrl: c.shortUrl
    }
  })

  const downTheRoad = board.find(b => b.name === 'Icebox')
  const downTheRoadItems = downTheRoad.cards
    .filter(c => c.labels.length > 0)
    .filter(c => c.labels[0].name !== 'Chore')
    .map(c => {
      const item = {
        name: c.name,
        type: c.labels[0].name.toLowerCase(),
        shortUrl: c.shortUrl
      }

      if (item.type.endsWith('!')) {
        item.type = item.type.substring(0, item.type.indexOf('!'))
      }

      return item
    })

  return {
    'In Progress': inProgressItems,
    Planned: plannedItems,
    'Down the Road': downTheRoadItems
  }
}

export async function addSuggestion(suggestion) {
  return addCardToBoard(process.env.TRELLO_SUGGESTION_LIST_ID, suggestion)
}
