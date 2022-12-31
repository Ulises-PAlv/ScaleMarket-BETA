import { ItemsCounter, ToStoreOrSell } from 'src/app/helpers/enums.helper';
import { WarehouseService } from 'src/app/services/sql/warehouse.service';
import { AuxiliarService } from 'src/app/services/sql/auxiliar.service';
import { CastingService } from 'src/app/services/sql/casting.service';
import { UsersService } from 'src/app/services/sql/users.service';
import { PackService } from 'src/app/services/sql/pack.service';
import { LsHelper } from 'src/app/helpers/localstorage.helper';
import { DomSanitizer } from '@angular/platform-browser';
import { NotifierService } from 'angular-notifier';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warehouse-status',
  templateUrl: './warehouse-status.component.html',
  styleUrls: ['./warehouse-status.component.scss']
})

export class WarehouseStatusComponent implements OnInit {
  prospectItems: any[] = [];
  warehouseItems: any[] = [];
  bandFocusImg: boolean = false;
  focusImg: any;
  user: any;

  totalItems: number[] = [0, 0];
  itemsToStore: number = 0;
  itemsToSell: number = 0;
  totalMoney: number = 0;

  constructor( private _notifier: NotifierService, private _user: UsersService, private _wh: WarehouseService,
    private _prospect: AuxiliarService, private _casting: CastingService, private _pack: PackService,
    public domSanitizer: DomSanitizer ) { }

  viewProspect() {

  }

  async consultCastings(id: number): Promise<any> {
    return await this._casting.getCastingById(id.toString()).toPromise();
  }

  async consultPacks(id: number): Promise<any> {
    return await this._pack.getPackById(id.toString()).toPromise();
  }

  async assignItem(type: string, id: number): Promise<any> {
    switch(type) {
      case 'pack': return await this.consultPacks(id); break;
      case 'casting': return await this.consultCastings(id); break;
    }
  }

  updateNegotiable(value: number, id: number) {
    value == 0? value = 1 : value = 0;
    let auxObj: any = { negotiable: value };
    this._wh.putNegotiableBand(id.toString(), auxObj);
  }

  updateSell(value: number, id: number) {
    value == 0? value = 1 : value = 0;
    let auxObj: any = { toStoreOrSell: value };
    this._wh.putNegotiableBand(id.toString(), auxObj);
  }

  updateTrade(value: number, id: number) {
    value == 0? value = 1 : value = 0;
    let auxObj: any = { trade: value };
    this._wh.putNegotiableBand(id.toString(), auxObj);
  }

  viewImage(img: any) {
    this.focusImg = img;
    this.bandFocusImg = true;
  }

  closeImg() {
    this.focusImg = {};
    this.bandFocusImg = false;
  }

  countItems(data: any): void {
    this.totalItems[ItemsCounter.TYPES] = data.length;
    data.forEach((item: any) => {
      item.toStoreOrSell == ToStoreOrSell.STORE ? this.itemsToStore++ : this.itemsToSell++;
      this.totalItems[ItemsCounter.ALL] += item.quantity;
      this.totalMoney += item.quantity * item.value;
    });
  }

  getProspectsData() {
    this._prospect.getProspectsByOwner(this.user.id).subscribe((data: any) => {
      this.prospectItems = data.map((row: any) => {
        this._user.getUserByIdSafe(row.prospectID).subscribe((res: any) => {
          row.user = res;
        });

        let aux = Object.assign({}, this.warehouseItems.find( item => item.id == row.itemID));
        row.item = this.cleanItemData(aux);
        return row;
      });
      console.log(this.prospectItems);
    });
  }

  load() {
    this.warehouseItems = [];
    this._wh.getUserWarehouse(this.user.id).subscribe(async (data: any) => {
      this.countItems(data);
      for(let i = 0; i < data.length; i++) {
        let auxItem = await this.assignItem(data[i].type, data[i].id);
        data[i].castingInfo = auxItem;
        data[i].base64Img = this.transformImg(data[i].refImg.data);
        delete data[i].refImg;
        delete data[i].castingInfo[0].refImg;
        this.warehouseItems.push(data[i]);
      }
      console.log(this.warehouseItems);

      this.getProspectsData();
    });
  }

  ngOnInit(): void {
    this.user = LsHelper.getItem('user');
    this.load();
  }

  cleanItemData(obj: any): any {
    delete obj.refImg;
    delete obj.soldOut;
    delete obj.toStoreOrSell;
    delete obj.trade;
    delete obj.dateStock;
    delete obj.castingInfo.refImg;
    return obj;
  }

  transformImg(bufferImg: number[]): any {
    const base64String = btoa(new Uint8Array(bufferImg).reduce((data, byte) => {
      return data + String.fromCharCode(byte);
      }, ''));
    return this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
  }
}
