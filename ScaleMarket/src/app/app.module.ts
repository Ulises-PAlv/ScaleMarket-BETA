import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { Error404Component } from './components/shared/error404/error404.component';
import { MenubarComponent } from './components/shared/menubar/menubar.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { AcademyComponent } from './components/academy/academy.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { ManagementComponent } from './components/management/management.component';
import { ItemViewComponent } from './components/item-view/item-view.component';
import { ShopComponent } from './components/shop/shop.component';
import { AuctionComponent } from './components/auction/auction.component';
import { TradeComponent } from './components/trade/trade.component';
import { CommunityComponent } from './components/community/community.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { UserComponent } from './components/user/user.component';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { VerifyProfileComponent } from './components/verify-profile/verify-profile.component';
import { WarehouseStatusComponent } from './components/warehouse-status/warehouse-status.component';
import { ProfileStatusPipe } from './pipes/profile-status.pipe';
import { StrikesPipe } from './pipes/strikes.pipe';

import { WebcamModule } from 'ngx-webcam';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BooleanPipe } from './pipes/boolean.pipe';

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'top',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 2
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    Error404Component,
    MenubarComponent,
    LoadingComponent,
    AcademyComponent,
    AboutUsComponent,
    ProfileComponent,
    LoginComponent,
    ManagementComponent,
    ItemViewComponent,
    ShopComponent,
    AuctionComponent,
    TradeComponent,
    CommunityComponent,
    AddItemComponent,
    UserComponent,
    WarehouseComponent,
    VerifyProfileComponent,
    WarehouseStatusComponent,
    ProfileStatusPipe,
    StrikesPipe,
    BooleanPipe
  ],
  imports: [ 
    FormsModule,  
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forRoot(ROUTES),
    NotifierModule.withConfig(customNotifierOptions),
    NoopAnimationsModule,
    MaterialModule,
    WebcamModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
