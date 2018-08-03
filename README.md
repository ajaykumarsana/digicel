# MBE Easy UI

## Get Started

You need nodejs and npm installed. Use `npm install` to get the rest of the dependencies.

`npm start` will give you a hot-reloading dev server.

## Before merging to master

Before commiting any code to master, make sure you don't break anything.

Please run `$ npm run premerge` to check linting and run a build.

## Build for deployment

We have build scripts to package the app as a tarball (for Apache) or war file (for Tomcat). Making a war file requires Java & Maven.

`$ npm run makedist:tar` or `$ npm run makedist:war`

Both scripts run a production build and then wrap the resulting `/dist` folder into the appropriate file type. The file will go into the `/tarballs` or `/war_files` folder (not checked into source control). 

`$ npm run release` will bump the version, run a build, make a war file, and push the tag to Github. Use `$ npm run release:minor` or `release:major` for bigger version bumps.

## Build for only one Provider

Specify the provider as the shell variable `MBE_PROVIDER` and run the `build:provider` script.

`$ MBE_PROVIDER=broadsoftBusiness npm run build:provider`

## Deep links and query params

Begin the Buyer journey at `localhost:4200/buyer/sign-up`

Enter tha Admin portal at `localhost:4200/login`

Add query params for engine, lang and provider. E.g., `localhost:4200/login?engine=rialto&lang=es&provider=broadsoftBusiness`

Today, available languages are: `en`, `es`, `fr`, `de`

Providers are: `broadsoftBusiness`, `optus`, `arkadin`, `att`, `laPoste`, `vodafone`, `telmex`,`cisco`, `digicel`

## Aliased Imports

See the tsconfig.json file for available aliases. For example, in a component you can use:
```
import { ApiService, User, UserService } from 'services';
```

One gotcha: Beware using the `services` alias within a service itself. Angular's DI sometimes reads this as a circular dependency. In services, it's safer to use:
```
import { ApiService } from '../api';
import { User, UserService } from '../user';
```

Also be sure to add an index.ts to new directories and add any classes or interfaces you wish to export. You will also need to update the index.ts in the parent directory.

## Localization

Do not hard code any visible text strings. Use the CmsService instead. Inject the service into your component (`public cms: CmsService`), and you'll have access to it in the template.

```
<h1>{{cms.get('voicemail')}}</h1>
<p>{{cms.get('voicemailIntroCopy')}}</p>
```

## Provider-specific data & branding

Provider-specific data is also available from the CmsService:

```
<a [href]="cms.getFromProvider('contactUsLink')">
```

SASS variables for each provider live in `src/styles/{provider}/_variables.scss`. If you add a new variable or image, you will need to rebuild the SASS map that lives in the `_theme.scss` file. You can do this automatically by running `$ npm run generate-sass-maps`.

# Generic Angular CLI Info

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.1.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


## Code Documentation

You can generate documentation for the app using ([Compodoc](https://github.com/compodoc/compodoc)) using the following :

* `npm run docs`

Then serve the same locally using:

* `npm run serve-docs`


Compodoc use Typescript AST parser and it's internal APIs, so the comments have to be JSDoc comments :

/**
 * Supported comment
 */

These ones are not supported :

/*
 * unsupported comment
 */

/*
  unsupported comment
 */

// unsupported comment

## Test Credit Card Numbers

<table>
<tr><th>CREDIT CARD     </th><th>TEST ACCOUNT NUMBER</th></tr>
<tr><td>Visa            </td><td>4111 1111 1111 1111</td></tr>
<tr><td>MasterCard	    </td><td>5555 5555 5555 4444</td></tr>
<tr><td>American Express</td><td>3782 8224 6310 005</td></tr>
<tr><td>Discover	      </td><td>6011 1111 1111 1117</td></tr>
<tr><td>JCB	            </td><td>3566 1111 1111 1113</td></tr>
</table>
