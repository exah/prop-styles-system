import 'jest-styled-components'
import renderer from 'react-test-renderer'
import styled from 'styled-components'
import { createElement as h } from 'react'
import { space, sizes, colors } from '../src'

const theme = {
  media: {
    M: '(max-width: 600px)'
  },
  space: [ 0, 8, 16, 32, 64 ],
  palette: {
    default: {
      bg: '#ffffff',
      fg: '#000000'
    },
    inverted: {
      bg: '#000000',
      fg: '#ffffff'
    }
  }
}

test('basic', () => {
  const Box = styled.div`
    ${space}
    ${sizes}
    ${colors}
  `

  const element = h(Box, { theme, width: true, tm: true, mg: { all: true, M: 0 } })
  const tree = renderer.create(element).toJSON()

  expect(tree).toMatchSnapshot()
})
