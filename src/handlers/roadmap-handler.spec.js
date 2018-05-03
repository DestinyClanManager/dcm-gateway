describe('roadmap-handler', () => {
  let subject, trelloService

  beforeEach(() => {
    trelloService = td.replace('./src/services/trello-service')
    subject = require('./roadmap-handler')
  })

  describe('getRoadmap', () => {
    let actual

    beforeEach(async () => {
      const board = [
        {
          name: 'Icebox',
          cards: [
            {
              desc: "As Andy I want to know what's new in the app after a deployment",
              name: "What's new",
              pos: 57343.125,
              labels: [
                {
                  id: '5ac573a0841642c2a8eff207',
                  idBoard: '5ac573a0920f2416e0ef967c',
                  name: 'Feature',
                  color: 'yellow'
                }
              ],
              shortUrl: 'https://trello.com/c/xOoNpjYL'
            },
            {
              desc: '',
              name: 'Update OAuth flow to allow for all platforms',
              pos: 524287,
              labels: [],
              shortUrl: 'https://trello.com/c/Ui94Mq9S'
            },
            {
              desc: 'As Andy, I want to be able to create events that clan members can sign up and participate in\n\nAs a member I want to be able to browse posted events and sign up to attend ones of my choosing',
              name: 'Clan events',
              pos: 786431,
              labels: [
                {
                  id: '5ac573a0841642c2a8eff20c',
                  idBoard: '5ac573a0920f2416e0ef967c',
                  name: 'Epic!',
                  color: 'purple'
                }
              ],
              shortUrl: 'https://trello.com/c/bzq6MkF5'
            }
          ]
        },
        {
          name: 'Backlog',
          cards: [
            {
              desc:
                'As Andy I want to see what new features are in the works and when i might be able to expect them.\n\nGIVEN I am on the homepage\nTHEN I see a link, Roadmap\nWHEN I click the link\nTHEN i see the features and bugs that are in the backlog and in progress',
              name: 'Make roadmap visible on site',
              pos: 20479.6875,
              labels: [
                {
                  id: '5ac573a0841642c2a8eff207',
                  idBoard: '5ac573a0920f2416e0ef967c',
                  name: 'Chore',
                  color: 'yellow'
                }
              ],
              shortUrl: 'https://trello.com/c/1nk804bO'
            },
            {
              desc:
                'As Andy, I want the inactivity report to start when I log in for the first time. Because now I have to wait until the next day to see my results.\n\nGIVEN I have logged in for the first time\nWHEN I am on the dashboard\nTHEN I see notification telling me about the inactivity report and how it takes time to gather the data\nAND the app starts the process of gathering the necessary data for the given clan\n\nTHEN when the data has finally been gathered I can reload inactive members row and see how many there are in my clan',
              name: 'Start inactive member report when clan logs in for first time',
              pos: 40959.375,
              labels: [
                {
                  id: '5ac573a0841642c2a8eff207',
                  idBoard: '5ac573a0920f2416e0ef967c',
                  name: 'Feature',
                  color: 'yellow'
                }
              ],
              shortUrl: 'https://trello.com/c/Y4sjYC7p'
            },
            {
              desc:
                'As a user I want to be able to select when an exemption should end\n\nWHEN I click Grant Exemption\nTHEN I see a dialog with a date picker\n\nWHEN the dialog opens\nTHEN the date picker is defaulted to a month from today\n\nWHEN I select a date\nIT grants the member an exemption until the selected date',
              name: 'Custom exemption end date',
              pos: 65535,
              labels: [
                {
                  id: '5ac573a0841642c2a8eff207',
                  idBoard: '5ac573a0920f2416e0ef967c',
                  name: 'Bug',
                  color: 'red'
                }
              ],
              shortUrl: 'https://trello.com/c/eeUdnuwl'
            }
          ]
        },
        {
          name: 'In Progress',
          cards: [
            {
              desc: '',
              name: 'Test bug',
              pos: 98300,
              labels: [
                {
                  id: '5ac573a0841642c2a8eff200',
                  idBoard: '5ac573a0920f2416e0ef967c',
                  name: 'Bug',
                  color: 'red'
                }
              ],
              shortUrl: 'https://trello.com/c/hhkNzfCj'
            },
            {
              desc: 'Test all network calls with Nock rather than mocking the http library',
              name: 'Test all network calls with nock',
              pos: 98303,
              labels: [
                {
                  id: '5ac573a0841642c2a8eff200',
                  idBoard: '5ac573a0920f2416e0ef967c',
                  name: 'Chore',
                  color: 'green'
                }
              ],
              shortUrl: 'https://trello.com/c/hhkNzfCj'
            },
            {
              desc: 'Test feature in progress',
              name: 'Test feature in progress',
              pos: 98310,
              labels: [
                {
                  id: '5ac573a0841642c2a8eff200',
                  idBoard: '5ac573a0920f2416e0ef967c',
                  name: 'Feature',
                  color: 'yellow'
                }
              ],
              shortUrl: 'https://trello.com/c/hhkNzfCj'
            }
          ]
        },
        {
          name: 'Done',
          cards: []
        }
      ]
      td.when(trelloService.getCardsFromBoard('board-id')).thenResolve(board)

      actual = await subject.getRoadmap()
    })

    describe('In Progress', () => {
      let inProgress

      beforeEach(() => {
        inProgress = actual['In Progress']
      })

      it('does not include chores', () => {
        expect(inProgress.find(c => c.type === 'chore')).toBe(undefined)
      })

      it('sorts by position on the board', () => {
        const expectedOrder = [
          {
            name: 'Test bug',
            type: 'bug',
            shortUrl: 'https://trello.com/c/hhkNzfCj'
          },
          {
            name: 'Test feature in progress',
            type: 'feature',
            shortUrl: 'https://trello.com/c/hhkNzfCj'
          }
        ]

        expect(inProgress).toEqual(expectedOrder)
      })
    })

    describe('Planned', () => {
      let planned

      beforeEach(() => {
        planned = actual['Planned']
      })

      it('does not include chores', () => {
        expect(planned.find(c => c.type === 'chore')).toBe(undefined)
      })

      it('sorts the items by their position on the board', () => {
        const expected = [
          {
            name: 'Start inactive member report when clan logs in for first time',
            type: 'feature',
            shortUrl: 'https://trello.com/c/Y4sjYC7p'
          },
          {
            name: 'Custom exemption end date',
            type: 'bug',
            shortUrl: 'https://trello.com/c/eeUdnuwl'
          }
        ]

        expect(planned).toEqual(expected)
      })
    })

    describe('Down the Road', () => {
      let downTheRoad

      beforeEach(() => {
        downTheRoad = actual['Down the Road']
      })

      it('does not include chores and unlabeled cards', () => {
        expect(downTheRoad.find(c => c.type === 'chore')).toBe(undefined)
        downTheRoad.forEach(i => {
          expect(i.type).toBeDefined()
        })
      })

      it('sorts the items by their position on the board', () => {
        const expected = [
          {
            name: "What's new",
            type: 'feature',
            shortUrl: 'https://trello.com/c/xOoNpjYL'
          },
          {
            name: 'Clan events',
            type: 'epic',
            shortUrl: 'https://trello.com/c/bzq6MkF5'
          }
        ]

        expect(downTheRoad).toEqual(expected)
      })
    })
  })

  describe('addSuggestion', () => {
    let card

    beforeEach(async () => {
      card = {
        name: 'name',
        desc: 'desc',
        pos: 'bottom'
      }

      await subject.addSuggestion(card)
    })

    it('sends the suggestion to trello', () => {
      td.verify(trelloService.addCardToBoard('list-id', card))
    })
  })
})
