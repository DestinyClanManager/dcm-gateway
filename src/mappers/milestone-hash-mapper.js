const milestoneMap = {
  '964120289': 'Crucible',
  '2043403989': 'Raid',
  '248695599': 'Gambit',
  '3789021730': 'Nightfall'
}

export function getHashName(hash) {
  const name = milestoneMap[hash]

  if (name === undefined) {
    throw new Error('Unknown milestone hash')
  }

  return name
}
