import { ItemsCounter, ToStoreOrSell } from 'src/app/helpers/enums.helper';
import { WarehouseService } from 'src/app/services/sql/warehouse.service';
import { AuxiliarService } from 'src/app/services/sql/auxiliar.service';
import { LsHelper } from 'src/app/helpers/localstorage.helper';
import { DomSanitizer } from '@angular/platform-browser';
import { NotifierService } from 'angular-notifier';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})

export class ShopComponent implements OnInit {
  yearsOpt: number[] = [];
  shopItems: any[] = [];
  user: any;


  constructor( private _notifier: NotifierService, private _wh: WarehouseService, private _prospect: AuxiliarService,
    public domSanitizer: DomSanitizer ) {
    this.addYearsOpt();
  }

  addYearsOpt() {
    let i = 1968;

    do {
      this.yearsOpt.push(i);
      i++;
    } while(i <= 2023);
  }

  filterType(value: string) {

  }

  filterYear(value: string) {

  }

  filterOddity(value: string) {

  }

  async load() {
    this._wh.getWarehouseToBuy().subscribe((res: any) => {
      this.shopItems = res;
      this.shopItems.forEach((item: any) => {
        item.base64Image = this.transformImg(item.refImg.data);
        delete item.refImg;
      });
      console.log(this.shopItems);
    });
  }

  ngOnInit(): void {
    this.user = LsHelper.getItem('user');
    this.load();
  }

  transformImg(bufferImg: number[]): any {
    const base64String = btoa(new Uint8Array(bufferImg).reduce((data, byte) => {
      return data + String.fromCharCode(byte);
      }, ''));
    return this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
  }
}
