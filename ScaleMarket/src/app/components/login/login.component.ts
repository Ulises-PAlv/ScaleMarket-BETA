import { Component, Inject, OnInit } from '@angular/core';
import { IUserPost } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/sql/users.service';
import { DOCUMENT } from '@angular/common';
import { DateHelper } from 'src/app/helpers/dateJS.helper';
import { NotifierService } from 'angular-notifier';
import { LsHelper } from 'src/app/helpers/localstorage.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  showSignIn: boolean = false;
  bandLogInSuccess: boolean = false;
  objUser: IUserPost = {
    name: '',
    email: '',
    password: '',
    registration_date: ''
  };

  constructor( private _user: UsersService, @Inject(DOCUMENT) private document: any,
  private _notifier: NotifierService ) { }

  checkLogIn(username: string, password: string) {
    this._user.getUsers().subscribe((res: any) => {
      res.forEach((user: any) => {
        if((user.password == password) && (user.username == username)) {
          LsHelper.addItem('user', user);
          this.bandLogInSuccess = true;
          this.document.location.href = '../home';
        }
      });
      if(!this.bandLogInSuccess) this.showNotification('error', 'No coincide el email y la contraseña');
    }); 
  }

  async signIn() {
    this.setObjValues(DateHelper.formatDate(new Date()), 4);
    console.log(this.objUser);
    await this._user.postUser(this.objUser);
    this.showNotification('info', 'Usuario agregado con exito!');
    this.showNotification('success', 'Bienvenid@ a BeyondCode');
  }

  switchSignInModal(): void {
    this.showSignIn = !this.showSignIn;
  }

  setObjValues(value: string, field: number) {
    switch(field) {
      case 0: this.objUser.name = value; break;
      case 1: this.objUser.email = value; break;
      case 2: this.objUser.password = value; break;
      case 4: this.objUser.registration_date = value; break;
    }
  }

  public showNotification( type: string, message: string ): void {
		this._notifier.notify( type, message );
	}

  ngOnInit(): void { }
}
