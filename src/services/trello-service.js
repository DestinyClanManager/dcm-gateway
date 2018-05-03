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

export async function addCardToBoard(listId, card) {
  const request = {
    uri: `${process.env.TRELLO_BASE_URL}/cards`,
    method: 'POST',
    qs: {
      idList: listId,
      name: card.name,
      desc: card.desc,
      pos: card.pos,
      key: process.env.TRELLO_API_KEY,
      token: process.env.TRELLO_TOKEN
    }
  }

  return await rp(request)
}
