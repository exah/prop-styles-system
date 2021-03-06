import { position } from '../..'
import { toStyles } from '../../../test-helpers'

const theme = {
  media: {
    sm: '(max-width: 600px)'
  }
}

test('position', () => {
  const result = position({
    theme,
    position: {
      all: 'relative',
      sm: 'static'
    }
  })

  const expected = {
    position: 'relative',
    [`@media ${theme.media.sm}`]: {
      position: 'static'
    }
  }

  expect(toStyles(result)).toEqual(expected)
})
