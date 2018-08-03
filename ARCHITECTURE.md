# MBE Easy UI Architecture

## Overall architecture and components

This project was originally generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.1. MIT License - [Angular CLI License](https://github.com/angular/angular-cli/blob/master/LICENSE)

It includes:
* Best practices in file and application organization for [Angular 5](https://angular.io/). MIT License - [Angular License](https://github.com/angular/angular/blob/master/LICENSE)
* Ready to go build system using [Webpack](https://webpack.github.io/docs/) MIT License [Webpack License](https://github.com/webpack/webpack/blob/master/LICENSE) for working with [TypeScript](http://www.typescriptlang.org/) Apache License 2.0[TypeScript License](https://github.com/Microsoft/TypeScript/blob/master/LICENSE.txt).
* Testing Angular 5 code with [Jasmine](http://jasmine.github.io/) MIt License [Jasmine License](https://github.com/jasmine/jasmine/blob/master/MIT.LICENSE)and [Karma](http://karma-runner.github.io/) MIT License [Karma License](https://github.com/karma-runner/karma/blob/master/LICENSE).
* Coverage with [Istanbul](https://github.com/gotwarlost/istanbul) BSD License [Istanbul License](https://github.com/gotwarlost/istanbul/blob/master/LICENSE).
* End-to-end Angular 5 code using [Protractor](https://angular.github.io/protractor/) MIT License [Protractor License](https://github.com/angular/protractor/blob/master/LICENSE).
* Stylesheets with [SASS](http://sass-lang.com/) (not required, it supports regular css too) MIT License [SASS License](http://sass-lang.com/documentation/file.MIT-LICENSE.html).
* Error reporting and linting with [TSLint](http://palantir.github.io/tslint/) Apache License 2.0 [TSLint License](https://github.com/palantir/tslint/blob/master/LICENSE) and [Codelyzer](https://github.com/mgechev/codelyzer) MIT License [Codelyzer License](https://github.com/mgechev/codelyzer/blob/master/LICENSE).
* Documentation with [Compodoc](https://github.com/compodoc/compodoc) MIT License [Compodoc License](https://github.com/mgechev/codelyzer/blob/master/LICENSE).

## File Structure 

This is the new standard for developing Angular apps and a great way to ensure maintainable code by encapsulation of our behavior logic.
A component is basically a self contained app usually in a single file or a folder with each concern as a file: style, template, specs, and component class.
Here's how it looks:

```
mbe-easy-ui/

 ├──dist/                         * output of Webpacks's builds (not in git)
 │   ├──assets                    * output of assets from build
 │
 ├──docs/                         * output of Compodoc's documentation generation via introspection (not in git)
 │
 ├──e2e/                          * E2E Test configs
 │
 ├──node_modules/                 * dependencies installed by npm (not in git)
 │
 ├──src/                          * our source Typescript files that will be compiled to javascript
 │   │
 │   ├──favicon.ico               * App favicon file
 │   │
 │   ├──index.html                * Index.html: where we generate our index page
 │   │
 │   ├──main.ts                   * our entry file for our browser environment
 │   │
 │   ├──polyfills.ts              * our polyfills file
 │   │
 │   ├──test.ts                   * This file is required by karma.conf.js and loads recursively all the .spec and framework files
 │   │
 │   ├──tsconfig.app.json         * Angular CLI extends tsconfig
 │   │
 │   ├──tsconfig.spec.json        * Angular CLI extends tsconfig
 │   │
 │   ├──typings.d.ts              * SystemJS module definition
 │   │
 │   ├──app/
 │   │   │
 │   │	 ├──admin/                * Admin Portal -  Admin module and components
 │   │   │
 │   │	 ├──buyer/                * Buyer Portal - Buyer module and components
 │   │   │
 │   │	 ├──countryselector/      * Digicel Country Selector - Country Selecto for Digicel markets and associated login component
 │   │   │
 │   │	 ├──group-level/          * Group Level User Experience (GLUE) modle and components post buyer account changes
 │   │   │
 │   │	 ├──http-interceptors/    * Angular’s HTTP interceptors can be used to pre- and postprocess HTTP requests. 
 │   │   │
 │   │	 ├──interfaces/           * Interfaces
 │   │   │
 │   │	 ├──mocks/                * Mocks
 │   │   │
 │   │	 ├──onboarding/           * Onboarding Portal - Onboarding module and onboarding components
 │   │   │
 │   │	 ├──pipes/                * Pipes module and pipes
 │   │   │
 │   │	 ├──post-trial/           * Post Trial Portal
 │   │   │
 │   │	 ├──provisioning/         * Provisioning Portal - Provisioning module and components
 │   │   │
 │   │	 ├──services/             * App services
 │   │   │
 │   │	 ├──shared-components/    * Shared components
 │   │   │
 │   │   ├──app.component.html    * template for the root component
 │   │   ├──app.component.scss    * styles for the root component
 │   │   └──app.component.spec.ts * unit tests for the root component
 │   │   ├──app.component.ts      * root component, loaded into index.html
 │   │	 ├──app.module.ts         * main module of the app
 │   │
 │   │──assets/                   * static assets are served from here ex provider specifc terms and conditions and LOA .pdf's
 │   │   ├──dtmf/                 * dtmf icon font files are kept here
 │   │   ├──images/               * app image files are kept here
 │   │
 │   └──environments/             * Environment specific config files
 │   │
 │   └──fonts/                    * App provider (themes) folders and font files
 │   │
 │   └──style/                    * stylesheets
 │       ├──global-vars/          * standard styles to be imported and used throughout the app
 │       └──app.scss              * styles that are applied to the whole page
 │   │
 │   └──vendor/                   * 3rd party dependencies
 │
 ├──tarballs/                     * output of build scripts package the app as a .tar.gz file for Apache (not in git)│
 │
 ├──war_files/                    * output of build scripts package the app as a war file for Tomcat (not in git)
 │
 ├──.angular-cli.json             * Angular CLI configuration
 ├──.editorconfig                 * Editor configuration file
 ├──.gitignore                    * file used to avoid adding in unwanted flies and directories in the application repo
 ├──ARCHITECTURE.md               * MBE Architecture documentation
 ├──generate-sass-maps.js         * Used to generate the provider based SASS maps of builds
 ├──karma.conf.js                 * Karma configuration file for MBE unit tests
 ├──makedist.js                   * creates output files of build and directories to hold the same if they dont exist either a Tarball for Apache or a War file for Tomcat
 ├──package.json                  * what npm uses to manage it's dependencies
 ├──package-lock.json             * Package lock file to ensure consistent installs of MBE dependencies across development machines
 ├──postbuild.js                  * Postbuild js file for renaming and moving provider.scss files
 ├──protractor.conf.js            * Protractor configuration file
 ├──README.md                     * README file all types of useful information on how a developer should develop for MBE
 ├──tsconfig.json                 * config that webpack uses for typescript
 ├──tslint.json                   * typescript lint config
 ├──webpack.config-prod.js        * webpack configuration file for prod
 ├──webpack.config.js             * webpack main configuration file
 
```


## How to swap backend

Swapping out the backend provider is accomplished by passing a query string parameter of engine to the url you wish to visit

Add query params for engine E.g., `localhost:4200/login?engine=rialto&lang=es&provider=broadsoftBusiness`

MBE is the default so if no engine param is given in the url the backend provider will be mbe alternativly you can pass in rialto as the engine param to use the Rialto backend.


## API calls

Api calls are made using the API service calling the call function (`call(endpointName: EndpointName, method: HttpMethod, path: string, body?: {}, customHeaders?: CustomHeader[]): Observable<any> {...}`) of the service which returns a response observable

The call servive parameters are as follows:
endpointName : 'speed' | 'ums' - config options from endpoint.config.ts can be expanded here 
method: 'get' | 'post' | 'put' | 'patch' | 'delete' - HTTP method 
path: string indicating the path to be used in the call
body (optional): based on http method being used
customHeaders (optional) : based on http method being used

## Adding new API calls

Adding new endpoint to the application can be achieved by creating a service which will have the needed CRUD methods to interact with the new API endpoint and where you will define the groupID and path options needed for the API service http calls.

## Adding new endpoints

Adding new endpoints can be accomplished by adding addional endpoint to the EndpointName type in the API service.

## How themes are built

Themes are built by adding a new provider (see below), adding in the fonts for the provider(see below), and adding in the approriate styles for the provider (see below)

## Creating New Providers

Providers are: `broadsoftBusiness`, `optus`, `arkadin`, `att`, `laPoste`, `vodafone`, `telmex`,`cisco`, `digicel`
Adding new providers can be accomplished by creating and adding in a module `{provider}.ts` file in the `src/app/services/cms/providers/` directory and exporting the module in the index.ts of the same folder.

## Creating/Adding Provider specifc fonts

Adding in provider specifc fonts is accomplished by creaing a folder in the `src/fonts/` directory to hold the provider specific fonts to be used in the theme. By convention the folder is named the same as the provider module name used when creating a new provider ex. `src/fonts/{provider}/`

## Creating/Adding Provider specifc styles
Adding in provider specifc styling is accomplished by creaing a folder in the `src/styles/` directory to hold the provider specific scss styles to be used in the theme. By convention the folder is named the same as the provider module name used when creating a new provider ex. `src/styles/{provider}/`

This provider specifc style folder will contain the following files:

_`{provider}`-fonts.scss - fonts definitions
_exports.scss - exports for the provider fonts and icons if any exists
_images.scss - variables which will be used to define images base location and image files to be used in the provider theme
_theme.scss - theme variables to be used in provider theme
_variables.scss - variable definitions to be used in the _theme.scss file

Note: If you add a new variable or image, you will need to rebuild the SASS map that lives in the `_theme.scss` file. You can do this automatically by running `$ npm run generate-sass-maps`.

## Localization

Localization in achieved via the LOCALIZATION module used by the Use the CmsService found in localization.ts in the `src/styles/cms/` directory. Each language is an object in this module and it can have nested properties and or nested objects which in turn have their own properties.

## Adding Locals

Adding a new localization language can be accomplished by creating new language object in the localization module with the appropriate keys and values. All language properties and objects need to be in sync between language objects in order to avoid errors when swicthing lnaguages for a provider.

## Iconography

Provider specifc icons are achieved through the the creation of an icon font which can be places in the provider specific font directory in `src/fonts/{provider}/`. By convention we name them the same as the provider ex. icon fonts would be `{provider}.eot`, `{provider}.ttf`, and `{provider}.woff`.

