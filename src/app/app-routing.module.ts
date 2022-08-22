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
    path: '',
    component: HomeComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
