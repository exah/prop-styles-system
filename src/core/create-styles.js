import {
  isFn,
  path,
  compose,
  isObj,
  toArr,
  reduceObj,
  mapObj
} from '@exah/utils'

import { wrapIfMedia, wrap, getThemeMedia, isMediaKey } from '../utils'
import { rule } from './rule'

/**
 * ```js
 * import pss from 'pss'
 * import { createStyles } from 'pss'
 * ```
 *
 * Create styles from {@link Object} with keys that represents component `prop` and
 * the value is a `style` that will be applied.
 *
 * ```js
 * { [prop]: style | (input, props, mediaKey) => style }
 * ```
 *
 * - `input` - prop value
 * - `props` {@link Object} - component props, including `theme`
 * - `mediaKey` {@link Object} - key in `theme.media`
 *
 *
 * In component prop accepts values:
 *
 * - {@link Boolean} — enable / disable simple styles or default {@link variant}
 *
 *    ```js
 *    const Comp = styled.div(createStyles({ red: { color: 'red' } }))
 *
 *    <Comp red /> // → color: red
 *    <Comp red={false} /> // → 🤷‍♂️
 *    ```
 *
 * - {@link Boolean}, {@link String}, {@link Number} — handled in functional styles
 *
 *    ```js
 *    const Comp = styled.div(createStyles({ width: (input) => ({ width: input } })))
 *
 *    <Comp width='100px' /> // → width: 100px
 *    ```
 *
 * - {@link Object} with keys defined in `theme.media` to define values for different screen sizes
 *
 *    ```js
 *    <Comp width={{ all: '100px', sm: '50px' }} /> // → width: 100px; @media (max-width: 600px) { width: 50px }
 *    ```
 *
 *
 *
 * @param {Object} stylesMap
 * @return {Function} `(props) => styles`
 *
 * @example
 * import { createStyles } from 'pss'
 *
 * const styles = createStyles({
 *   display: value => ({ display: value }),
 *   hide: { display: 'none' },
 *   width: (value, props, mediaKey) => ({
 *     width: mediaKey === 'sm' && value === true ? '100%' : value
 *   })
 * })
 *
 * const Box = styled.div`
 *   ${styles}
 * `
 *
 * @example
 * <Box display='inline-flex' /> // → display: inline-flex
 * <Box hide /> // → display: none
 *
 *
 * @example
 * // Add media queries
 * const theme = {
 *   media: {
 *     sm: '(max-width: 600px)'
 *   }
 * }
 *
 * <Box theme={theme} width={{ all: '100px', sm: true }} /> // → width: 100px; @media (max-width: 600px) { width: 100% }
 *
 * <ThemeProvider theme={theme}>
 *   <Box display='flex' hide={{ sm: true }} /> // → display: flex; @media (max-width: 600px) { display: none }
 * </ThemeProvider>
 */

export function createStyles (stylesMap) {
  function getStyles (props) {
    const themeMedia = getThemeMedia(props)

    function mapStyles ({ input, style, selector, mediaKey }) {
      // value with `theme.media` keys: { all: 0, M: 1 }
      // or selector { '&:first-child': 1 }
      if (isObj(input)) {
        return mapObj(
          (key, value) => (
            isMediaKey(key, themeMedia)
              ? mapStyles({ input: value, style, selector, mediaKey: key })
              : mapStyles({ input: value, style, selector: key, mediaKey })
          ),
          input
        )
      }

      const wrapper = compose(
        wrapIfMedia(path([ mediaKey ])(themeMedia)),
        wrap(selector)
      )

      if (isFn(style)) {
        return wrapper(style(input, props, mediaKey))
      }

      if (input != null && input !== false) {
        return wrapper(style)
      }
    }

    return reduceObj(
      (acc, name, input) => acc.concat(
        toArr(stylesMap[name]).map((style) => mapStyles({
          input,
          style: style === true ? rule(name) : style
        }))
      ),
      [],
      props
    )
  }

  return Object.assign(getStyles, {
    props: Object.keys(stylesMap),
    styles: stylesMap
  })
}
