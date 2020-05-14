import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';


const routes: Routes = [
  // {
  //   path: '',
  //   // component: HeaderComponent,
  //   redirectTo: 'HeaderComponent',
  //   pathMatch: 'full'
  // },
  {
    path: 'eligibility-check',
    loadChildren: './eligibility-check/eligibility-check.module#EligibilityCheckModule',
    pathMatch: 'full'
  },
  {
    path: 'preauthorization',
    loadChildren: './preauthorization/preauthorization.module#PreauthorizationModule',
    pathMatch: 'full'
  },


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
