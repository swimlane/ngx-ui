## CONTRIBUTING

- Fork this repo and clone the forked on your local environment
- Run `npm install` to install all dependencies
  - Run `npx husky install` to enable commit hooks
- Start working on changes

### NGX-UI

- Work on a branch for a fix/feature
- Commit your changes using `npm run commit` command
  - This initiates Conventional Commits flow
- PR your branch like usual

#### Add a new Component/Library

> **What is a library?**
> Components, Pipes and Directives follow the SCAM (Single Component As Module) approach. For NX workspace a library will be the same as an angular module.

- Generate a Angular library: `npx ng generate @nrwl/angular:library {{name_of_library}} --directory=ngx-ui --buildable --publishable --importPath=@swimlane/ngx-ui/{{name_of_library}} --prefix=ngx --simpleModuleName --tags=scope:{{name_of_library}},type:lib`
- Adjust property `name` in `{{name_of_library}}/package.json` to `@swimlane/ngx-ui/{{name_of_library}}`

#### Work with existing library

- If you add new Public API to the library, make sure to edit `index.ts` in that library

#### Release

- Once the PR **is merged**, and **is ready** to cut a new release
- Pull `master`
- Run `npm run release`
  - If this is a pre-release, please run `npm run release:pre`. See more docs [here](https://github.com/release-it/release-it/blob/master/docs/pre-releases.md)
  - `CHANGELOG` will be updated based on the commits. Types of commits that will appear in the `CHANGELOG` are defined in [.release-it.json](.release-it.json)
    - `feat` will bump a `minor` version
    - `fix`, `perf`, and `refactor` will bump a `patch` version
    - a `BREAKING CHANGE` in the commit will bump a `major` version
      > It is worth noting that a `patch` version is always bumped when run `npm run release` so make sure to only run `release` script when the repo is actually ready to be released.
- Confirm everything in the terminal before say Yes to "Commit"
  - This is also the time when `CHANGELOG` can be updated manually with custom changes.
  - After updating `CHANGELOG` manually (if need be) at this step, make sure to stage the changes with `git add .` (in a different terminal) before saying Yes to "Commit"
- There will be Release hooks

  - `after:bump`: After the version has been bumped, this hook will run `git checkout -b release/${version}` to checkout a `release` branch and will run `npm run build:libs`
  - `after:release`: After you have accepted to "Commit" question and "Tag" question, this hook will run `git push origin HEAD --tags` to push the branch and tag upstream. This follows the current release flow

  - if there is an error, you will need to delete branch and tag **locally and on the remote**.
    - TODO [run programmatically](https://github.com/release-it/release-it/blob/master/docs/recipes/programmatic.md)

- There will be GitHub Actions to publish to NPM.
  - Manual steps at the moment are:
    - `npm run build:libs` to build `ngx-ui`, copy assets, and `ngx-doc`
    - `npm run publish:libs` to publish to npm
      - `npm run publish:libs:beta` to publish to npm with `beta` tag

### NGX-DOC

> will get published with ngx-ui from above steps

### Docs Site

The demo site is filled with code snippets and documentations. These are provided by utilizing `ngx-doc-markdown`

#### Add a new component/page
> we utilize [nx workspace generator](https://nx.dev/l/n/generators/workspace-generators) to simplify the creation and standardize the docs structure
Note: paths for these workspace generators assume the `<doc root>/src/app` in the path so that can be excluded when providing the path. i.e. provide the path starting from inside the `app` folder

- To create a page run `npm run doc:page <page_name> <path_to_page>`
  - A page is a navigable route on the docs site. i.e. it'll show up in the side nav
  - To manually create
    1. generate a module `ng generate module {{module}}`
    2. generate a component `ng generate component {{component}} --inlineStyle --inlineTemplate --skipTests --flat`
    3. use `generateRoutes` to make a child route in page module imports
       1. `RouterModule.forChild(generateRoutes(MyPageComponent))`
    4. update `app.routes.ts` to lazy load the module in
    5. update the component template to use `<ngx-doc-page>`
  
- To create an example run `npm run doc:example <example_name> <path_to_example>`
  - An example is a specific example you wish to show within a page
  - To manually create
    1. generate a component `ng generate component {{component}} --inlineStyle --skipTests --flat`
    2. create an `index.ts` file next to the component
    3. import the component and template via `raw-loader`
    4. create a `DocExamples` object for the template and component imports named `<ExampleComponentName>Content`
    5. export the doc example, template, and component
    6. update the parent page to use this example

```bash
npm run doc:page my-fancy-page . # using '.' to be at the root of `app` folder
```

```ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { generateRoutes } from '@swimlane/ngx-doc';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(generateRoutes(SomeComponent))],
  declarations: [SomeComponent],
})
export class SomeModule {}
```

- Add a lazy load path to the new Module in `app.routes.ts`

```ts
import { Routes } from '@angular/router';

const appRoutes: Routes = [
  ,
  /*...*/ {
    path: 'path-to-some',
    loadChildren: () =>
      import('./path-to-some-module/some.module').then((m) => m.SomeModule),
    data: {
      title: 'Title for Some', // will appear as 'ngx-ui | Title for Some' on the browser tab
    },
  },
];
```

- Add a record for the new page in `app.component.ts#navigationItems`

#### Working with a component/page

A component/page starts with `ngx-doc-page` component and with one or more `ngx-doc-example`/`ngx-doc-markdown` blocks. You can create nested child components for each `ngx-doc-example`.

```
some (with no nested example components)
├── docs
│   ├── doc-1.md
│   ├── doc-2.md
│   └── doc-3.md
├── examples
│   ├── example-1.html
│   ├── example-2.ts
│   └── example-3.scss
├── some.component.ts
└── some.module.ts
```

```
some (with nested example components)
├── some-example-1
│   ├── docs
│   │   └── doc-1.md
│   ├── examples
│   │   └── example-1.html
│   └── some-example-1.component.ts
├── some-example-2
│   ├── docs
│   │   └── doc-2.md
│   ├── examples
│   │   └── example-2.ts
│   └── some-example-2.component.ts
├── some.component.ts
└── some.module.ts
```

It is up to the developers to go with either structure based on the complexity of the examples, or purely preferences. Check `ngx-doc` for more detailed usages
