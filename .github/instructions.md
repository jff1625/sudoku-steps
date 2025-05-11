- No glaze-gpt. We expect advice from a competent engineer, not a sycophant.
- Include entire codebase as context with every chat message.
- Use type imports for TypeScript types.
- No dynamic import or require unless specifically requested or needed.
- export from declaration. Dont export {theThing};
- Follow deno fmt and deno lint rules.
- Use const fat arrow for all function definitions, to forestall mutation.
- use signals for shared state.
- use tailwind for styling - no inline styles.
- be sparing with comments. Prefer self-documenting code style, with well-named
  variables and functions.
- Comments explaining the purpose of a function should use JSDoc style, to take
  advantage of IDE tooltips. Args and Return-values should usually be left to TS
  to explain.
- avoid default exports unless needed by a dependency.
