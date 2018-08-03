import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LOCALIZATION } from './localization';
import * as PROVIDERS from './providers';

type AvailableLanguages = 'en' | 'es' | 'fr' | 'de';
type AvailableEngines = 'mbe' | 'rialto';

@Injectable()
export class CmsService {
  private language = 'en';
  private languages = {en: 'English', es: 'Español', fr: 'Français', de: 'Deutsche'};
  private engine = 'mbe';
  private engines = ['mbe', 'rialto'];
  // Note: the providers array will get overwritten in the production build process to only include specified providers
  // Keep as a single line and do not change the property name
  /* tslint:disable-next-line:max-line-length */
  private providers = ['broadsoftBusiness', 'optus', 'arkadin', 'att', 'vodafone', 'laPoste', 'telmex', 'cisco', 'digicel'];
  public provider: string;

  constructor(private route: ActivatedRoute) {
    this.provider = this.providers[0];
    this.language = this.getFromProvider('defaultLanguage');
    this.engine = this.getFromProvider('defaultServiceProvider');
    this.languages = this.getFromProvider('languages');
    this.setProvider(JSON.parse(sessionStorage.getItem('provider')));
    this.switchLanguage(JSON.parse(sessionStorage.getItem('language')));
    this.switchEngine(JSON.parse(sessionStorage.getItem('engine')));

    if (this.route.queryParams) {
      this.route.queryParams.subscribe(params => {
        if (params['provider']) {
          this.setProvider(params['provider']);
        }
        if (params['lang']) {
          this.switchLanguage(params['lang']);
        }
        if (params['engine']) {
          this.switchEngine(params['engine']);
        }
      });
    }

    // Initialize the default provider if none is set
    if (!sessionStorage.getItem('provider')) {
      this.initializeProvider();
    }
  }

  initializeProvider() {
    this.setFavicon();
    this.setPageTitle();
    this.setDefaultLanguage();
    this.setLanguages();
  }

  get(key: string, ...args: any[]): string {
    let keys: Array<string> = [];
    let localeString = LOCALIZATION[this.language]; // no type defined due to arg stuff

    keys = key.split('.');
    for (let i = 0; i < keys.length; i++) {
      localeString = localeString[keys[i]];
    }

    if (args.length === 0) {
      return localeString;
    } else {
      return localeString(...args);
    }
  }

  getFromProvider(key: string): any {
    return PROVIDERS[this.provider][key];
  }

  getLocalizedFromProvider(key: string): any {
    return PROVIDERS[this.provider][key] && PROVIDERS[this.provider][key][this.language];
  }

  getLanguageLinks(): {key: string, display: string}[] {
    const languageLinks = [];
    for (let [key, display] of Object.entries(this.languages)) {
      if (key !== this.language) {
        languageLinks.push({key, display});
      }
    }
    return languageLinks;
  }

  switchEngine(newEngine: AvailableEngines) {
    if (this.isValidEngine(newEngine)) {
      this.engine = newEngine;
      // Switching engines so we blow away catalogs in session storage
      sessionStorage.removeItem('catalog');
      sessionStorage.setItem('engine', JSON.stringify(this.engine));
    }
  }

  switchLanguage(newLanguage: AvailableLanguages) {
    if (this.isValidLanguage(newLanguage)) {
      this.language = newLanguage;
      sessionStorage.setItem('language', JSON.stringify(this.language));
    }
  }

  getLanguage(): AvailableLanguages {
    return this.language as AvailableLanguages;
  }

  getEngine(): AvailableEngines {
    return this.engine as AvailableEngines;
  }

  setProvider(provider: string) {
    if (this.isValidProvider(provider)) {
      this.provider = provider;
      sessionStorage.setItem('provider', JSON.stringify(this.provider));
      this.initializeProvider();
    }
  }

  hasMoreThanOneLang(): boolean {
    let languages = (Object.keys(this.getFromProvider('languages')));
    if (languages.length > 1) {
      return true;
    } else {
      return false;
    }
  }

  private setFavicon() {
    let link = document.querySelector(`link[rel*='icon']`) || document.createElement('link');
    link.setAttribute('type', 'image/x-icon');
    link.setAttribute('rel', 'shortcut icon');
    link.setAttribute('href', this.getFromProvider('favicon'));
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  private setPageTitle() {
    document.title = this.getFromProvider('appName');
  }

  private setDefaultLanguage() {
    this.language = this.getFromProvider('defaultLanguage');
  }

  private setLanguages() {
    this.languages = this.getFromProvider('languages');
  }


  private isValidProvider(provider: string): boolean {
    return this.providers.includes(provider);
  }

  private isValidEngine(engine: string): boolean {
    let engineTest = this.engines.includes(engine);
    return engineTest;
  }

  private isValidLanguage(lang: string): boolean {
    let providerLanguages = this.getFromProvider('languages');
    return LOCALIZATION.hasOwnProperty(lang) && providerLanguages.hasOwnProperty(lang);
  }

}
