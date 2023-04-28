import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PersonasComponent } from './personas/personas.component';
import { DetailComponent } from './personas/detail.component';
//import { DivDetailComponent } from './divisiones/div.detail.component';
//import { DivisionesComponent } from './divisiones/divisiones.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'personas', component: PersonasComponent },
  { path: 'personas/:id', component: DetailComponent },
  //{ path: 'division', component: DivisionesComponent },
  //{ path: 'division/:anio', component: DivDetailComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }