import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CmsService } from 'services';

@Component({
  selector: 'app-countryselector',
  templateUrl: './countryselector.component.html',
  styleUrls: ['./countryselector.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CountrySelectorComponent implements OnInit {

  constructor(public cms: CmsService) {
  }

  ngOnInit() {

  }

}
