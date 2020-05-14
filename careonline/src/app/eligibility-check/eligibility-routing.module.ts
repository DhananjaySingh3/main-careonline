import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EligibilityCheckComponent } from './eligibility-check.component';


const routes: Routes = [
    {
        /*path: 'preauthorization',*/
        path: '',
        component: EligibilityCheckComponent,
        /*
        children: [
            {
                path: 'eligibility-list',
                component: PreauthListComponent
            }
        ]
        */
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EligibilityRoutingModule { }
