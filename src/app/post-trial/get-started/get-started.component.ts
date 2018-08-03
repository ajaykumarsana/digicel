import { Component, OnInit } from '@angular/core';
import { CmsService } from 'services';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent implements OnInit {

  constructor(public cms: CmsService) { }

  ngOnInit() {
  }

}
