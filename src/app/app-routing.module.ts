import { LoginComponent } from './view/login/login.component';
import { HomeComponent } from './view/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavRouters} from './common/routesNav'

const routes: Routes = [
  {
    path: NavRouters.PAGE.HOME,
    component: HomeComponent
  },
  {
    path: NavRouters.PAGE.LOGIN,
    component: LoginComponent
  },
  {
    path: '',
    component: LoginComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
