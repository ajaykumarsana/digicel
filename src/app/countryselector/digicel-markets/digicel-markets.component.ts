import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/mergeMap';
import { FormValidationService, CmsService } from 'services';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ControlMessagesComponent } from 'components';
import { DIGICELMARKETS } from './digicel-markets';

@Component({
  selector: 'app-digicel-markets',
  templateUrl: './digicel-markets.component.html',
  styleUrls: ['./digicel-markets.component.scss']
})
export class DigicelMarketsComponent implements OnInit {
  digicelLoginForm: FormGroup;
  loading = false;
  error: string;
  digicelMarkets: string[];
  markets = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public cms: CmsService,
    private formValidationService: FormValidationService
  ) {

   }

  ngOnInit() {
    // if (this.digicelMarkets.length > 1) {
    //   sessionStorage.setItem('digicelMarkets', JSON.stringify(this.digicelMarkets));
    //   this.divideMarketsIntoColumns(this.digicelMarkets, 9);
    // } else {
    //   // we need to get the value from session storage
    //   let storedMarkets = JSON.parse(sessionStorage.getItem('digicelMarkets'));
    //   this.divideMarketsIntoColumns(storedMarkets, 9);
    // }
    this.digicelMarkets = DIGICELMARKETS;
    console.log('digicelMarkets = ', this.digicelMarkets);
    this.divideMarketsIntoColumns(this.digicelMarkets, 9);
  }

  divideMarketsIntoColumns( marketsArray, columns) {
    let results = [];
    while (marketsArray.length) {
      results.push(marketsArray.splice(0, columns));
    }
    this.markets = results;
  }

  goToMarket(market) {
    console.log('goToMarket clicked market = ', market);
    this.router.navigate(['/countryselector/digicel-login']);
  }

}
