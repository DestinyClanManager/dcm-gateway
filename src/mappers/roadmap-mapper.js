import sort from 'fast-sort'

export function mapCardToRoadmapItem(card) {
  return {
    name: card.name,
    pos: card.pos,
    type: card.labels[0].name.toLowerCase()
  }
}

export function mapListToTimeline(list) {
  return sort(list.cards).asc(c => c.pos)
}
