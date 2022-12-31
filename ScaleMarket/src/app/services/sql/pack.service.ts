import { ServerDirections, SQL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PackService {
  environment: any;
  petitions: any;

  constructor( private _http: HttpClient ) {
    this.environment = new ServerDirections();
    this.petitions = new SQL();
    console.log('PackService Loaded...');
  }

  getAllPacks() {
    const url = this.environment.mysql_url + this.petitions.get.allPacks;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getVerifiedPacks() {
    const url = this.environment.mysql_url + this.petitions.get.verifiedPacks;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getPackById(id: string) {
    const url = this.environment.mysql_url + this.petitions.get.packByID + id;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  postPack(body: any) {
    const url = this.environment.mysql_url + this.petitions.post.pack;
    this._http.post(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  putCorrectionToVerify(id: string, body: any) {
    const url = this.environment.mysql_url + this.petitions.put.packCorrectionToVerify + id;
    this._http.put(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  putVerifyPack(id: string, body: any) {
    const url = this.environment.mysql_url + this.petitions.put.verifyPack + id;
    this._http.put(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  deletePack(id: string) {
    const url = this.environment.mysql_url + this.petitions.delete.pack + id;
    this._http.delete(url).subscribe((res: any) => {
      console.log(res);
    });
  }
}
