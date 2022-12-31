import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  appOpt: string = '';

  constructor() {
    this.appOpt = '';
  }

  renderApp(res: any) {
    this.appOpt = res;
    console.log(this.appOpt)
  }

  ngOnInit(): void {
  }
}
