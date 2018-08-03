import { Headers } from '@angular/http';
import { Endpoint } from './endpoint';
import { HttpHeaders } from '@angular/common/http';

const speedHeaders = new HttpHeaders ({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

const umsHeaders = new HttpHeaders({
  'Accept': 'application/json',
  'Content-Type': 'application/json; charset=utf-8'
});

export const EndpointConfig: { 'speed': Endpoint, 'ums': Endpoint } = {
  'speed': new Endpoint({
    baseUrl: 'https://mbe-server.mvp.broadsoft.net:443/speed/api',
    headers: speedHeaders,
    useCookies: true,
    expectedResponse: 'json'
  }),
  'ums': new Endpoint({
    headers: umsHeaders,
    useCookies: false,
    expectedResponse: 'json'
  }),

};
