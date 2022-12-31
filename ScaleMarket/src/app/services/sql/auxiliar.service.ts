import { ServerDirections, SQL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuxiliarService {
  environment: any;
  petitions: any;

  constructor( private _http: HttpClient ) {
    this.environment = new ServerDirections();
    this.petitions = new SQL();
    console.log('AuxiliarService Loaded...');
  }

  getAllTradeWishes() {
    const url = this.environment.mysql_url + this.petitions.get.allTradeWishes;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getTradeWishById(id: string) {
    const url = this.environment.mysql_url + this.petitions.get.tradewishByID + id;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getProspectsByItem(id: string) {
    const url = this.environment.mysql_url + this.petitions.get.prospectsByItem + id;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getProspectsByProspectUser(id: string) {
    const url = this.environment.mysql_url + this.petitions.get.prospectsByUser + id;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getProspectsByOwner(id: string) {
    const url = this.environment.mysql_url + this.petitions.get.prospectsByOwner + id;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  postTradewish(body: any) {
    const url = this.environment.mysql_url + this.petitions.post.tradewish;
    this._http.post(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  postProspect(body: any) {
    const url = this.environment.mysql_url + this.petitions.post.prospect;
    this._http.post(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  putProspectTurn(id: string, body: any) {
    const url = this.environment.mysql_url + this.petitions.put.updateProspectTurn + id;
    this._http.put(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  deleteTurn(id: string) {
    const url = this.environment.mysql_url + this.petitions.delete.removeTurn + id;
    this._http.delete(url).subscribe((res: any) => {
      console.log(res);
    });
  }

  deleteItemTurns(id: string) {
    const url = this.environment.mysql_url + this.petitions.delete.removeItemTurns + id;
    this._http.delete(url).subscribe((res: any) => {
      console.log(res);
    });
  }
}
