import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { RetrieveComponent } from './retrieve/retrieve.component';
import { SumComponent } from './sum/sum.component';

const routes: Routes = [
	{ path: '', component: CreateComponent },
	{ path: 'retrieve', component: RetrieveComponent },
	{ path: 'sum', component: SumComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
