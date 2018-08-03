import { Observable } from 'rxjs/Rx';

export class MockRoute {
  queryParams = Observable.of({});
  params = Observable.of({});
  url = Observable.of([]);
  fragment = Observable.of(null);
  data = Observable.of({});
  outlet = null;
  component = null;
  snapshot = null;
  routeConfig = {};
  root = null;
  parent = null;
  firstChild = null;
  children = [];
  pathFromRoot = null;
  paramMap = Observable.of({});
  queryParamMap = Observable.of({});

  constructor() {}

}
