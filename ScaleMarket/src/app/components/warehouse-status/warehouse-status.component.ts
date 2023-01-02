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
  bandAddItem: boolean = false;
  focusImg: any;
  user: any;

  totalItems: number[] = [0, 0];
  itemsToStore: number = 0;
  itemsToSell: number = 0;
  totalMoney: number = 0;

  warehouse_list: any[] = [];
  auxImageToPost: any;
  typeStr: string = '';
  postBlob: any;

  constructor( private _notifier: NotifierService, private _user: UsersService, private _wh: WarehouseService,
    private _prospect: AuxiliarService, private _casting: CastingService, private _pack: PackService,
    public domSanitizer: DomSanitizer ) { }

  viewProspect() {
    
  }

  updateType(type: string) {
    this.typeStr = type;
    this.getWarehouseList();
    console.log(this.typeStr);
  }

  getWarehouseList(): void {
    this.warehouse_list = [];

    if(this.typeStr == 'Pack') {
      this._pack.getVerifiedPacks().subscribe((data: any) => {
        data.forEach((item: any) => {
          let obj = {
            id: item.id,
            name: item.name,
            edition: item.edition,
            year: item.year,
            type: 'pack'
          }
          this.warehouse_list.push(obj);
        });
      });
    } else {
      this._casting.getVerifiedCastings().subscribe((res: any) => {
        res.forEach((item: any) => {
          let obj = {
            id: item.id,
            name: item.name,
            oddity: item.oddity,
            year: item.year,
            variant: item.variant,
            type: 'casting'
          }
          this.warehouse_list.push(obj);
        });
      });
    }
  }

  addItem() {
    this.bandAddItem = true;
  }

  closeAddItem() {
    this.bandAddItem = false;
  }
  
  convertBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
  }

  async uploadRefImg(e: any): Promise<any> {
    const file = e.target.files[0];
    const base64: any = await this.convertBase64(file);
    console.log(base64);
    
    const base64Response = await fetch(base64);
    let aux = await base64Response.arrayBuffer();
    this.postBlob = new Uint8Array(aux);
    console.log(this.postBlob);
  }

  async postItem(type: string, item: any, blister: string, blCondition: string, castingScore: any, cost: string, quantity: string) {
    let obj = {
      userID: this.user.id,
      itemID: item,
      type: type,
      blister: blister,
      blisterCondition: blCondition,
      castingScore: castingScore,
      value: cost,
      negotiable: 0,
      soldOut: 0,
      trade: 0,
      quantity: quantity,
      ToStoreOrSell: 0
    }

    console.log(obj);
    this._wh.postWareHouseItem(obj).subscribe((res: any) => {
      let imgObj = {
        buffer: this.postBlob
      };
      console.log(res)
      this._wh.putWhImage(res.insertId, imgObj);
    });

    /* let imgObj = {
      buffer: this.postBlob
    };
    let response = await this._wh.postWareHouseItem(obj)
    console.log(response);
    if(response) {
      await this._wh.putWhImage(response, imgObj);
    } */
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
    switch(value) {
      case 0: value = 1; break; case 1: value = 0; break;
    }
    console.log(value); console.log(id);
    let auxObj: any = { negotiable: value };
    this._wh.putNegotiableBand(id.toString(), auxObj);
  }

  updateSell(value: number, id: number) {
    switch(value) {
      case 0: value = 1; break; case 1: value = 0; break;
    }
    console.log(value); console.log(id);
    let auxObj: any = { toStoreOrSell: value };
    this._wh.putStoreBand(id.toString(), auxObj);
  }

  updateTrade(value: number, id: number) {
    switch(value) {
      case 0: value = 1; break; case 1: value = 0; break;
    }
    console.log(value); console.log(id);
    let auxObj: any = { trade: value };
    this._wh.putTradeBand(id.toString(), auxObj);
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
      console.log(data);
      this.countItems(data);
      for(let i = 0; i < data.length; i++) {
        let auxItem = await this.assignItem(data[i].type, data[i].itemID);
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
