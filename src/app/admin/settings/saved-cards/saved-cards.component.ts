import { Component, OnInit } from '@angular/core';
import { CmsService } from 'services';

@Component({
  selector: 'app-saved-cards',
  templateUrl: './saved-cards.component.html',
  styleUrls: ['./saved-cards.component.scss']
})
export class SavedCardsComponent implements OnInit {

  constructor(public cms: CmsService) { }

  ngOnInit() {
  }

  seeCard() {
    console.log('See Card Clicked');
  }

}
