import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { LsHelper } from 'src/app/helpers/localstorage.helper';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {
  @Output() selectOpt = new EventEmitter<string>();

  constructor( @Inject(DOCUMENT) private document: any ) { }

  selectAppOpt(option: string) {
    this.selectOpt.emit(option);
  }

  logout():void {
    LsHelper.removeItem('user');
    this.document.location.href = '../login';
  }

  ngOnInit(): void { }
}
