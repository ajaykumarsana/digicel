import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError } from 'rxjs/operators';
import { EndpointConfig } from './endpoint.config';
import { Endpoint } from './endpoint';
import { CmsService } from '../cms/';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
type EndpointName = 'speed' | 'ums';
interface CustomHeader { name: string; value: string; }

@Injectable()
export class ApiService {
  endpoints = EndpointConfig;
  endpoint: Endpoint;
  lang = this.cmsService.getLanguage();
  langParams = '?lang=' + this.lang;



  constructor(
    private http: HttpClient,
    private cmsService: CmsService
  ) { }

  call(endpointName: EndpointName, method: HttpMethod, path: string, body?: {}, customHeaders?: boolean): Observable<any> {
    let httpCall: Observable<Object>;
    this.endpoint = this.endpoints[endpointName];
    const lang = this.cmsService.getLanguage();
    let langParams = '?lang=' + lang;
    const fullPath = this.endpoint.baseUrl + '/' + path + langParams;
    let  options = this.endpoint.options();

    if (customHeaders) {
      options.headers =  new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      });
    }

    switch (method) {
      case 'get':
        httpCall = this.http.get(fullPath, options);
        break;
      case 'post':
        httpCall = this.http.post(fullPath, body, options);
        break;
      case 'put':
        httpCall = this.http.put(fullPath, body, options);
        break;
      case 'patch':
        httpCall = this.http.patch(fullPath, body, options);
        break;
      case 'delete':
        httpCall = this.http.delete(fullPath, options);
        break;
    }

    return httpCall.pipe(
      catchError(e => this.parseError(e))
    );
  }

  parseError(err): any {
    console.log('in parseError err = ', err);
    if (err['_body']) {
      const errBody = JSON.parse(err['_body']);
      const errMsg = errBody['statusMsg'];
      if (errBody.statusCode === 'E4200') {
        throw errBody ? errBody : errMsg;
      } else {
        throw errMsg ? errMsg : errBody;
      }
    } else {
      throw err;
    }
  }

  setHeader(endpointName: EndpointName, headerName: string, headerValue: string): void {
    this.endpoint = this.endpoints[endpointName];
    this.endpoint.headers.set(headerName, headerValue);
  }

  setBaseUrl(endpointName: EndpointName, url: string): void {
    const endpoint = this.endpoints[endpointName];
    endpoint.baseUrl = url;
  }

}
