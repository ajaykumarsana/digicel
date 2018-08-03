import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CmsService } from 'services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() iconClass: string;

  constructor(public route: ActivatedRoute, public cms: CmsService) {
    this.getPageTitle();
  }

  ngOnInit() {
  }

  getPageTitle() {
    this.title = this.route.snapshot.data['title'] || 'Unknown';

  }

}
