import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToPdfComponent } from './components/print-download/to-pdf/to-pdf.component';
import { ToImageComponent } from './components/print-download/to-image/to-image.component';


const routes: Routes = [
  // {path: '', redirectTo: 'toimage', pathMatch: 'full'},
  {path: 'toimage', component: ToImageComponent},
  {path: 'topdf', component: ToPdfComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
