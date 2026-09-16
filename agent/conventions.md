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
