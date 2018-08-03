import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CmsService, CatalogService, UserService } from 'services';

@Component({
  selector: 'app-post-trial',
  templateUrl: './post-trial.component.html',
  styleUrls: ['./post-trial.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PostTrialComponent implements OnInit {

  constructor(public cms: CmsService, public user: UserService, public catalog: CatalogService) { }

  ngOnInit() {
    this.catalog.getCatalog().subscribe();
  }

}
