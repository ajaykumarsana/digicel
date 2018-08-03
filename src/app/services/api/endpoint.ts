import { Headers, Response, RequestOptionsArgs } from '@angular/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';

interface Options {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType: 'json';
  withCredentials?: boolean;
}

export class Endpoint {
  baseUrl: string;
  headers: HttpHeaders;
  expectedResponse: 'json' | 'text';
  useCookies: boolean;

  constructor(obj: {baseUrl?: string, headers: HttpHeaders, useCookies?: boolean, expectedResponse: 'json' | 'text'}) {
    this.baseUrl = obj.baseUrl;
    this.headers = obj.headers;
    this.useCookies = obj.useCookies;
    this.expectedResponse = obj.expectedResponse;
  }

  options(): Options {
    let options: Options = {
      headers: this.headers,
      responseType: 'json'
    };
    if (this.useCookies) {
      options.withCredentials = this.useCookies;
    }
    return options;
  }

  parse(res: Response): any {
    if (this.expectedResponse === 'json') {
      return res.json();
    } else {
      return res;
    }
  }
}
