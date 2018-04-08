import rp from 'request-promise'

export async function getCardsFromBoard(boardId) {
  const request = {
    uri: `${process.env.TRELLO_BASE_URL}/boards/${boardId}/lists`,
    qs: {
      cards: 'all',
      key: process.env.TRELLO_API_KEY,
      token: process.env.TRELLO_TOKEN
    },
    json: true
  }

  return await rp(request)
}
