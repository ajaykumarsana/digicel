import { Component, OnInit } from '@angular/core';
import { PostTrialService, CmsService, UserService } from 'services';

@Component({
  selector: 'app-bill-preview',
  templateUrl: './bill-preview.component.html',
  styleUrls: ['./bill-preview.component.scss']
})
export class BillPreviewComponent implements OnInit {

  public numbers: Array<any>;
  public devicesSubTotal: number;
  public monthlySubTotal: number;
  public monthlyTotal: number;
  public monthlyTaxes: number;
  public monthlyFees: number;

  public devicesTaxes: number;
  public oneTimeCharges: number;
  public linePrice: number;
  public devicesTotal: number;
  public total: number;

  constructor(
    public postTrialService: PostTrialService,
    public cms: CmsService,
    public user: UserService
  ) {

    }

  ngOnInit() {
    this.numbers = this.postTrialService.getNumbers();
    this.linePrice = this.cms.getFromProvider('linePrice') || 0;
    this.monthlyTaxes = 1199.00; // temp
    this.monthlyFees = 299.00; // temp

    this.devicesTaxes = 11.00; // temp
    this.oneTimeCharges = 100.00; // temp
    this.devicesTotal = 0;
    this.devicesSubTotal = 0;
    this.monthlySubTotal = 0;
    this.total = 0.00; // temp

    this.sumTotals();


  }

  sumTotals() {
    this.devicesSubTotal = 0;
    if (!this.numbers) {
      this.numbers = this.postTrialService.getNumbers();
    }
    this.numbers.forEach(member => {

      if (member.device && member.device.price) {
        this.devicesSubTotal += parseFloat((member.device.price).replace('$', ''));
      }
      this.devicesTotal = this.devicesSubTotal + this.devicesTaxes + this.oneTimeCharges;
      this.monthlyTotal = this.monthlyFees + this.monthlySubTotal + this.monthlyTaxes;
      this.total = this.devicesTotal + this.monthlyTotal;

      this.devicesSubTotal = Number(this.devicesSubTotal.toFixed(2));
      this.monthlySubTotal = Number(this.monthlySubTotal.toFixed(2));
      this.devicesTotal = Number(this.devicesTotal.toFixed(2));
      this.monthlyTotal = Number(this.monthlyTotal.toFixed(2));
      this.total = Number(this.total.toFixed(2));
    });
  }

}
