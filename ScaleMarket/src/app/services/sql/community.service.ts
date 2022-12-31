import { ServerDirections, SQL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CommunityService {
  environment: any;
  petitions: any;

  constructor( private _http: HttpClient ) {
    this.environment = new ServerDirections();
    this.petitions = new SQL();
    console.log('CommunityService Loaded...');
  }

  getCommunities() {
    const url = this.environment.mysql_url + this.petitions.get.allCommunities;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getCommunity(id: string) {
    const url = this.environment.mysql_url + this.petitions.get.communityByID + id;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getAllMembers() {
    const url = this.environment.mysql_url + this.petitions.get.allMembers;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getUserCommunities(id: string) {
    const url = this.environment.mysql_url + this.petitions.get.userCommunities + id;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  getCommunityMembers(id: string) {
    const url = this.environment.mysql_url + this.petitions.get.membersOfCommunities + id;
    return this._http.get(url).pipe(map( data => {
      return data;
    }));
  }

  postCommunity(body: any) {
    const url = this.environment.mysql_url + this.petitions.post.community;
    this._http.post(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  postMember(body: any) {
    const url = this.environment.mysql_url + this.petitions.post.member;
    this._http.post(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }

  putCommunityDescription(id: string, body: any) {
    const url = this.environment.mysql_url + this.petitions.put.updateCommunityDescription + id;
    this._http.put(url, body).subscribe((res: any) => {
      console.log(res);
    });
  }
}
