import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { PersonasComponent } from './personas/personas.component';
import { DetailComponent } from './personas/detail.component';
import { HttpClientModule } from "@angular/common/http";
import { DivisionesComponent } from './divisiones/divisiones.component';
import { DivDetailComponent } from './divisiones/div.detail.component';
import { CarDetailComponent } from './cargos/car.detai.component';
import { CargosComponent } from './cargos/cargos.component';
import { DeDetailComponent } from './designaciones/de.detail.component';
import { DesignacionesComponent } from './designaciones/designacion.component';
import { LicDetailComponent } from './licencias/lic.detail.component';
import { LicenciasComponent } from './licencias/licencias.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PersonasComponent,
    DetailComponent,
    DivisionesComponent,
    DivDetailComponent,
    CargosComponent,
    CarDetailComponent,
    DesignacionesComponent,
    DeDetailComponent,
    LicenciasComponent,
    LicDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }