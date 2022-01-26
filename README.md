# ngx-ui

Component & Style Library for Angular by Swimlane.

## Installing

- `npm i @swimlane/ngx-ui --S`
- Install the project's [peer dependencies](https://github.com/swimlane/ngx-ui/blob/master/projects/swimlane/ngx-ui/package.json#L27) (moment, codemirror)
- Add `NgxUIModule` to your application module

## Building ngx-ui

Run `npm run build:lib` to build ngx-ui. This must be done prior to building the demo.

## Development server

Run `npm run start` to serve the demo at `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Building

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running tests

- Run `npm run test` to execute unit tests
- Run `ng cypress` to execute the end-to-end tests via Cypress.

## Release

- Checkout master (`git checkout master`)
- Pull master (`git pull`)
- Refresh node modules (`npm ci`)
- Run tests (`npm test`)
- Examine log to determine next version (X.Y.Z)
- Run `git checkout -b release/X.Y.Z`
- Update version in `projects/swimlane/ngx-ui/package.json`.
- Update changelog in `projects/swimlane/ngx-ui/CHANGELOG.md`
- Run `git commit -am "(release): X.Y.Z"`
- Run `git tag X.Y.Z`
- Run `git push origin HEAD --tags`
- Run `npm run publish:lib`
- Submit PR
