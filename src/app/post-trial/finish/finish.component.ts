import { Component, OnInit } from '@angular/core';
import { CmsService } from 'services';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  constructor( public cms: CmsService) { }

  ngOnInit() {
  }

}
