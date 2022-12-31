import { Routes } from '@angular/router';

// ?? Components #############################################################################
    import { HomeComponent } from './components/home/home.component';
    import { AcademyComponent } from './components/academy/academy.component';
    import { LoginComponent } from './components/login/login.component';
    import { AboutUsComponent } from './components/about-us/about-us.component';
    import { ProfileComponent } from './components/profile/profile.component';
    import { UserComponent } from './components/user/user.component';
    import { ShopComponent } from './components/shop/shop.component';
    import { ItemViewComponent } from './components/item-view/item-view.component';
    import { AddItemComponent } from './components/add-item/add-item.component';
    import { CommunityComponent } from './components/community/community.component';
    import { ManagementComponent } from './components/management/management.component';

    // ** Common
    import { Error404Component } from './components/shared/error404/error404.component';

// ?? Array path's ############################################################################
    export const ROUTES : Routes = [
        { path: 'login', component: LoginComponent },
        { path: 'home', component: HomeComponent },
        { path: 'shop', component: ShopComponent },
        { path: 'item-view/:name', component: ItemViewComponent },
        { path: 'add-item', component: AddItemComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'user/:id', component: UserComponent },
        { path: 'aboutus', component: AboutUsComponent },
        { path: 'academy', component: AcademyComponent },
        { path: 'community', component: CommunityComponent },
        { path: 'management', component: ManagementComponent },
        { path: '', pathMatch: 'full', redirectTo: 'login' },
        { path: '**', pathMatch: 'full', component: Error404Component }
    ];