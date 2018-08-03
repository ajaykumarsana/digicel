import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product, CmsService } from 'services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Input() selectedProduct: Product;
  @Output() deviceSelected = new EventEmitter<Product>();
  @Output() deviceRemoved = new EventEmitter<Product>();
  public productSelected = false;

  constructor(public cms: CmsService) { }

  ngOnInit() {
    if (this.product === this.selectedProduct) {
      this.productSelected = true;
    }
  }

  selectDevice() {
    this.deviceSelected.emit(this.product);
  }

  removeDevice() {
    this.deviceRemoved.emit(this.product);
  }

}
