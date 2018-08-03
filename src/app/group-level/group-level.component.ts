import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CmsService } from 'services';

@Component({
  selector: 'app-group-level',
  templateUrl: './group-level.component.html',
  styleUrls: ['./group-level.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class GroupLevelComponent implements OnInit {

  constructor(public cms: CmsService) { }

  ngOnInit() {
  }

}
