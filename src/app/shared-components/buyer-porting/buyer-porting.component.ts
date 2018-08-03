import { Component } from '@angular/core';
import { routerTransition } from '../router-transition';
import { CmsService } from 'services';

@Component({
  selector: 'app-buyer-porting',
  animations: [ routerTransition ],
  templateUrl: './buyer-porting.component.html',
  styleUrls: ['./buyer-porting.component.scss']
})
export class BuyerPortingComponent {

  constructor(public cms: CmsService) {

  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
