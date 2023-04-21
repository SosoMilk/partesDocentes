import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PersonasComponent } from './personas/personas.component';
import { DetailComponent } from './personas/detail.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'personas', component: PersonasComponent
  },
  {
    path: 'persona/:Dni', component: DetailComponent
  }
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