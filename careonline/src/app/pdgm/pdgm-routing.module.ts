import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PdgmComponent } from './pdgm.component';


const routes: Routes = [
    {
        path: '',
        component: PdgmComponent,
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PDGMRoutingModule { }
