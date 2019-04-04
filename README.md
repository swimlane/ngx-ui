# ngx-ui [![Code Climate](https://codeclimate.com/github/swimlane/ngx-ui/badges/gpa.svg)](https://codeclimate.com/github/swimlane/ngx-ui)

Component & Style Library for Angular by Swimlane.

_Note: This project is under heavy construction and is not intended for general production use yet.
As such, we are not accepting bugs at the moment and documentation is quite lacking._

## Installing

- `npm i @swimlane/ngx-ui --S`
- Install the project's [peer depencencies](https://github.com/swimlane/ngx-ui/blob/master/projects/swimlane/ngx-ui/package.json#L27) (moment, codemirror)
- Add `NgxUIModule` to your application module

## Building ngx-ui

Run `npm run build:lib` to build ngx-ui. This must be done prior to building the demo.

## Development server

Run `ng serve` to serve the demo at `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running end-to-end tests

Run `ng cypress` to execute the end-to-end tests via Cypress.
