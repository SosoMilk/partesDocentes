import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PersonasComponent } from './personas/personas.component';
import { DetailComponent } from './personas/detail.component';
import { DivDetailComponent } from './divisiones/div.detail.component';
import { DivisionesComponent } from './divisiones/divisiones.component';
import { CarDetailComponent } from './cargos/car.detai.component';
import { CargosComponent } from './cargos/cargos.component';
import { DeDetailComponent } from './designaciones/de.detail.component';
import { DesignacionesComponent } from './designaciones/designacion.component';
import { LicDetailComponent } from './licencias/lic.detail.component';
import { LicenciasComponent } from './licencias/licencias.component';
import { ParteDiarioComponent } from './licencias/parteDiario.component';
import { docenteComponent } from './designaciones/concep.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'personas', component: PersonasComponent },
  { path: 'personas/:id', component: DetailComponent },
  { path: 'division', component: DivisionesComponent },
  { path: 'division/:id', component: DivDetailComponent },
  { path: 'cargo', component: CargosComponent},
  { path: 'cargo/:id', component: CarDetailComponent },
  { path: 'designacion', component: DesignacionesComponent },
  { path: 'designacion/:id', component: DeDetailComponent },
  { path: 'reporte/concepto', component: docenteComponent},
  { path: 'licencias', component: LicenciasComponent },
  { path: 'licencias/:id', component: LicDetailComponent },
  { path: 'licencias/parte/diario', component: ParteDiarioComponent}
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