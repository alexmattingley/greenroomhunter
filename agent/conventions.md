# Conventions

Coding standards and conventions for this repository.

## CSS Styling

### Never use `!important` tags in CSS

When styling components, especially when overriding third-party library styles
(like Material UI), always increase CSS specificity before resorting to
`!important` tags.

#### Preferred approaches to increase specificity
1. **Use double ampersand (`&&`) in styled-components** — increases specificity by repeating the class selector
2. **Chain class selectors** — use multiple class selectors to increase specificity
3. **Use more specific selectors** — target nested elements with more specific paths
4. **Use attribute selectors** — combine class selectors with attribute selectors when appropriate

#### Example
```css
/* ❌ Bad - Using !important */
.component {
  color: red !important;
}

/* ✅ Good - Using increased specificity */
.component.component {
  color: red;
}
```

```js
/* ✅ Good - Using double ampersand in styled-components */
export const StyledComponent = styled(Component)`
  && {
    color: red;
  }
`;
```

Only use `!important` as an absolute last resort when all other methods of
increasing specificity have been exhausted and documented.

## Use shared tokens and types

Prefer the shared style library over one-off values. Avoid custom fonts, font
weights, font sizes, paddings, margins, colors, border radii, and breakpoints
when a token exists in `data/styles-data.js` (`colors`, `typescales` /
`generateStylesForSize`, `borderRadius`, `breakpts`).

If no suitable token exists for something that should be reusable, surface that
gap rather than silently hardcoding a value.

Type your code — reuse and extend shared types instead of redefining shapes
inline.

## Follow DRY

Don't duplicate logic, styles, or content. Extract shared code, reference a
single source of truth, and avoid restating the same information in multiple
places.

## Don't reinvent the wheel

For well-established UI patterns (carousels, cards, tabs, modals, tooltips,
etc.), use an existing, maintained library or component instead of building it
from scratch.

**Always ask before creating custom functionality for these patterns.** Surface
the library/open-source options as choices rather than hand-rolling the feature
without checking first.

## Keep code and comments simple

Write code and comments that are easy to understand. Comments should explain the
non-obvious "why" in plain language — if a comment is confusing or just restates
the code, leave it out.

## Don't add hooks that don't help performance

Minor performance hits are acceptable. Before reaching for `useCallback`,
`useMemo`, or `useReducer`, ask: **will this hook actually improve performance?**

Common cases where it does help: a value/function is in a dependency array of an
effect or another memo, or it's passed to a memoized (`React.memo`) child. If
neither applies (e.g. an inline `onClick` on a plain DOM element), skip the hook
and write the plain version.
