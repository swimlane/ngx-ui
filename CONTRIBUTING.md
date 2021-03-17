## CONTRIBUTING

- Fork this repo and clone the forked on your local environment
- Run `npm install` to install all dependencies
  - Run `npx husky install` to enable commit hooks
- Start working on changes

### Demo Site

#### Working with Markdown

The demo site is filled with code snippets and documentations. These are provided in Markdown format.

- `packages/demo/src/assets/markdowns` is where all the markdown files are contained.
- The structure of `/assets/markdowns` matches with the structure of the demo app
- `tools/md-watch.ts` is a **TypeScript** script that watches `/assets/markdowns`
  - When the script first executes, it will gather all paths to all the markdown files and generate a `markdown-path.type.ts` as a **Type Alias**
  - When there is a new `.md` file added, it will add the path to the new `.md` file to `markdown-path.type.ts`
  - When a `.md` file is deleted (or renamed), it will update the path.

Sample usage as follows:

- Add a new Markdown file to `/assets/markdowns`. Eg: `/assets/markdowns/forms/buttons/test-markdown.md`
- A string `'forms/buttons/test-markdown'` will be generated and added to `markdown-path.type.ts`
- Use `<demo-markdown path="forms/buttons/test-markdown"></demo-markdown>` to render this Markdown file. `path` will be intellisensed according to `markdown-path.type.ts`
  > Sometimes, you'd need to open `markdown-path.type.ts` for TypeScript to re-index this file so intellisense will work.

#### `demo-markdown` component

`demo-markdown` is a component that wraps `ngx-markdown`. You can either use a Markdown file or Inline markdown with `demo-markdown`

```html
<demo-markdown path="forms/buttons/buttons"></demo-markdown>

<demo-markdown>**inline markdown goes here**</demo-markdown>
```

> If you want to render Code block with Highlighting with Inline syntax, use `<![CDATA[content goes here]]>` to prevent Angular from trying to parse the code.

#### `demo-tabbed-markdown` component

`demo-tabbed-markdown` is a component that will accept multiple Markdown path and render them in a `ngx-tabs`

```html
<demo-tabbed-markdown
  htmlPath="forms/buttons/ngx-button.html"
  tsPath="forms/buttons/ngx-button.ts"
></demo-tabbed-markdown>
```
