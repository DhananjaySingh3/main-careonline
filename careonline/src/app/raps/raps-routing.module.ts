import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RapsComponent } from './raps.component';


const routes: Routes = [
  {
    path: '',
    component: RapsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RapsRoutingModule { }
