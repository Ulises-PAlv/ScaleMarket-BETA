import { ServerDirections, SQL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WarehouseService {
  environment: any;
  petitions: any;

  constructor( private _http: HttpClient ) {
    this.environment = new ServerDirections();
    this.petitions = new SQL();
    console.log('WarehouseService Loaded...');
  }

  getWarehouseNotSold() {
    const url = this.environment.mysql_url + this.petitions.get.allWareHouseNotSold;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getAllWarehouse() {
    const url = this.environment.mysql_url + this.petitions.get.allWareHouse;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getWarehouseToBuy() {
    const url = this.environment.mysql_url + this.petitions.get.warehouseToBuy;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getWarehouseToStore() {
    const url = this.environment.mysql_url + this.petitions.get.warehouseToStore;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getWarehouseToTrade() {
    const url = this.environment.mysql_url + this.petitions.get.warehouseToTrade;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getWarehousePacks() {
    const url = this.environment.mysql_url + this.petitions.get.warehousePacks;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getWarehouseCastings() {
    const url = this.environment.mysql_url + this.petitions.get.warehouseCastings;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getWarehouseLoose() {
    const url = this.environment.mysql_url + this.petitions.get.warehouseLoose;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getUserWarehouse(id: string) {
    const url = this.environment.mysql_url + this.petitions.get.userWarehouse + id;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getWarehouseItem(type: string, id: string) {
    const url = this.environment.mysql_url + this.petitions.get.itemWarehouse + type + '/' + id;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  postWareHouseItem(body: any): any {
    const url = this.environment.mysql_url + this.petitions.post.warehouse;
    let response = null;
    /* this._http.post(url, body).subscribe((res: any) => {
      console.log(res);
      response = res;
    }); */
    return this._http.post(url, body);
    // return response;
    /* this._http.post(url, body).subscribe((res: any) => {
      console.log(res);
      return res;
    }); */
  }

  putRestockItem(id: string, body: any) {
    const url = this.environment.mysql_url + this.petitions.put.restockItem + id;
    this._http.put(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  putSoldOutItem(id: string, body: any) {
    const url = this.environment.mysql_url + this.petitions.put.soldOutItem + id;
    this._http.put(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  putItemQuantity(id: string, body: any) {
    const url = this.environment.mysql_url + this.petitions.put.updateItemQuantity + id;
    this._http.put(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  putNegotiableBand(id: string, body: any) {
    const url = this.environment.mysql_url + this.petitions.put.updateNegotiableBandItem + id;
    this._http.put(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  putTradeBand(id: string, body: any) {
    const url = this.environment.mysql_url + this.petitions.put.updateTradeBandItem + id;
    this._http.put(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  putStoreBand(id: string, body: any) {
    const url = this.environment.mysql_url + this.petitions.put.updateStoreBandItem + id;
    this._http.put(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  putWhImage(id: string, body: any) {
    const url = this.environment.mysql_url + this.petitions.put.addWhImage + id;
    this._http.put(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }
}
