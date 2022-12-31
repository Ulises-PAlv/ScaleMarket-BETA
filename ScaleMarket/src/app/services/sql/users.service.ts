import { ServerDirections, SQL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  environment: any;
  petitions: any;

  constructor( private _http: HttpClient ) {
    this.environment = new ServerDirections();
    this.petitions = new SQL();
    console.log('UsersService Loaded...');
  }

  getUsers() {
    const url = this.environment.mysql_url + this.petitions.get.allUsers;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getUsersSafe() {
    const url = this.environment.mysql_url + this.petitions.get.allUsersSafe;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getBannedUsers() {
    const url = this.environment.mysql_url + this.petitions.get.bannedUsers;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getUserById(id: string) {
    const url = this.environment.mysql_url + this.petitions.get.userByID + id;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getUserByIdSafe(id: string) {
    const url = this.environment.mysql_url + this.petitions.get.userByIdSafe + id;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  postUser(body: any) {
    const url = this.environment.mysql_url + this.petitions.post.user;
    this._http.post(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  postBannedUser(body: any) {
    const url = this.environment.mysql_url + this.petitions.post.banUser;
    this._http.post(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  putUserInfo(id: string, body: any) {
    const url = this.environment.mysql_url + this.petitions.put.addUserInfo + id;
    this._http.put(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  putUserLocation(id: string, body: any) {
    const url = this.environment.mysql_url + this.petitions.put.updateUserLocation + id;
    this._http.put(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  putUserStatus(id: string, body: any) {
    const url = this.environment.mysql_url + this.petitions.put.updateUserStatus + id;
    this._http.put(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  putUserDescription(id: string, body: any) {
    const url = this.environment.mysql_url + this.petitions.put.updateUserDescription + id;
    this._http.put(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  putUserTransactions(id: string, body: any) {
    const url = this.environment.mysql_url + this.petitions.put.updateUserTransactions + id;
    this._http.put(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  putUserStrikes(id: string, body: any) {
    const url = this.environment.mysql_url + this.petitions.put.updateUserStrikes + id;
    this._http.put(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }
}
