import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreauthorizationComponent } from './preauthorization.component';
import { PreauthListComponent } from './components/preauth-list/preauth-list.component';


const routes: Routes = [
    {
        /*path: 'preauthorization',*/
        path: '',
        component: PreauthListComponent,
    }
    // {
    //     /*path: 'preauthorization',*/
    //     path: '',
    //     component: PreauthorizationComponent,
    //     children: [
    //         {
    //             path: 'preauth-list',
    //             component: PreauthListComponent
    //         }
    //     ]
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PreauthorizationRoutingModule { }
