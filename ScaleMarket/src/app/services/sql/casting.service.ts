import { ServerDirections, SQL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CastingService {
  environment: any;
  petitions: any;

  constructor( private _http: HttpClient ) {
    this.environment = new ServerDirections();
    this.petitions = new SQL();
    console.log('CastingService Loaded...');
  }

  getAllCastings() {
    const url = this.environment.mysql_url + this.petitions.get.allCastings;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getVerifiedCastings() {
    const url = this.environment.mysql_url + this.petitions.get.verifiedCastings;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getCastingById(id: string) {
    const url = this.environment.mysql_url + this.petitions.get.castingByID + id;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  postCasting(body: any) {
    const url = this.environment.mysql_url + this.petitions.post.casting;
    this._http.post(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  putCorrectionToVerify(id: string, body: any) {
    const url = this.environment.mysql_url + this.petitions.put.castingCorrectionToVerify + id;
    this._http.put(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  putVerifyCasting(id: string, body: any) {
    const url = this.environment.mysql_url + this.petitions.put.verifyCasting + id;
    this._http.put(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  deleteCasting(id: string) {
    const url = this.environment.mysql_url + this.petitions.delete.casting + id;
    this._http.delete(url).subscribe((res: any) => {
      console.log(res);
    });
  }
}
