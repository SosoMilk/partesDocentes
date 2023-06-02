import { Location, JsonPipe } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataPackage } from "../data-package";
import { Designaciones } from "./designacion";
import { DesignacionService } from "./designacion.service";
import { PersonaService } from "../personas/personas.service";
import { Persona } from "../personas/persona";
import { Cargos } from "../cargos/cargo";
import { CargoService } from "../cargos/cargos.services";

import { Observable, Subject, merge, OperatorFunction, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: "app-detail",
    template: `
    <div *ngIf="designacion">
      <h2>Nueva designacion&nbsp;
      <button (click)="save()" [disabled]="form.invalid" class="btn btn-success" >Guardar</button>
        &nbsp;
        <button (click)="goBack()" class="btn btn-danger">Atrás</button>
      </h2>


      <form #form="ngForm">
        <div class="form-group">
          <label for="name">Persona:</label>
          <br />
          <input
            [(ngModel)]="designacion.persona"
            name="Persona"
            placeholder="Persona"
            class="form-control"
            required
            [ngbTypeahead]="searchPersona"
            [editable]="false"
            [resultFormatter]="resultFormatPersona"
            [inputFormatter]="inputFormatPersona"
            type="text"
          />
          
          <div class="info-group">
              <div class="persona-label">DNI</div>
              <div class="persona-info">{{ designacion.persona?.dni }}</div>
              <div class="persona-label">Nombre</div>
              <div class="persona-info">{{ designacion.persona?.nombre }}</div>
              <div class="persona-label">Apellido</div>
              <div class="persona-info">{{ designacion.persona?.apellido }}</div>
          </div>
        </div>
      </form>

      <form #form="ngForm">
        <div class="form-group">
          <label for="name">Cargo:</label>
          <br />
          <input
            [(ngModel)]="designacion.cargo"
            name="Cargo"
            placeholder="Cargo"
            class="form-control"
            required
            [ngbTypeahead]="searchCargo"
            [editable]="false"
            [resultFormatter]="resultFormatCargo"
            [inputFormatter]="inputFormatCargo"
            type="text"
          />
          
          <div class="info-group">
            
              <div class="persona-label">Tipo</div>
              <div class="persona-info">{{ designacion.cargo?.tipo }}</div>
              <div class="persona-label">Nombre</div>
              <div class="persona-info">{{ designacion.cargo?.nombre }}</div>
           
          </div>
          <div class="info-group">
              <div class="persona-label">Carga Horaria:</div>
              <div class="persona-info">{{ designacion.cargo.cargaHoraria }}&nbsp;</div>
              <div class="persona-label">Año:</div>
              <div class="persona-info">{{ designacion.cargo.division?.anio }}&nbsp;</div>
              <div class="persona-label">Numero:</div>
              <div class="persona-info">{{ designacion.cargo.division?.numero }}&nbsp;</div>
              <div class="persona-label">Turno:</div>
              <div class="persona-info">{{ designacion.cargo.division?.turno }}&nbsp;</div>
          </div>
        </div>
      </form>

      <div>&nbsp;</div>
      <form #form="ngForm">
      <div class="form-group">
          <div style="display: inline-block;">
            <label for="vigenteDesde">vigente desde: </label>
            <label>
              <input
                [(ngModel)]="designacion.fechaInicio"
                type="date"
                name="vigente desde"
                required
          pattern="yyyy-MM-dd"
                />
              <span class="validity"></span>
            </label>
          </div>
          <div style="display: inline-block; margin-left: 150px;">
            <label for="vigenteHasta ">vigente hasta: </label>
            <label>
              <input
                [(ngModel)]="designacion.fechaFin"
                type="date"
                name="vigente desde"
                required 
                pattern="yyyy-MM-dd"/>
              <span class="validity"></span>
            </label>
          </div>
      </div>

      <div *ngIf="fechaOcupada" class="alert alert-danger alert-dismissible fade show">
          La fecha para este cargo institucional ya esta ocupada
      <button 
        type="button"
        class="btn-close" 
        aria-label="Close"
        (click) = "fechaOcupada = false"
      >
      </button>
    </div>

        <div *ngIf="errorFecha" class="alert alert-danger alert-dismissible fade show">
          La fecha que ingreso cuenta con un error.
          <button 
            type="button"
            class="btn-close" 
            aria-label="Close"
            (click) = "errorFecha = false"
          >
          </button>
        </div>

      </form>

  `,
    styles: [
      `
			.form-control {
				width: 300px;
			}

              .persona-info {
        display: inline-block;
        margin-left: 5px;
        margin-right: 20px;
        vertical-align: top;
      }

        .persona-label {
          width: 120px;
          height: 35px;
          background-color: #9fb6f2;
          text-align: center;
          line-height: 50px;
          margin-bottom: 5px;
          font-weight: bold;
          border-radius: 10px;
        }

        .info-group {
          display: flex;
          align-items: center;
          margin-top: 5px;
        }

        select.form-control {
           width: 100%;
        }
		`],
})
export class DeDetailComponent {
  designacion!: Designaciones;
  personas: Persona[] = [];
  cargos: Cargos[] = [];
  fechaOcupada: boolean = false;
  errorFecha: boolean = false;
  searching: boolean = false;
  searchFailed: boolean = false;


    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private designacionService: DesignacionService,
        private personaService: PersonaService,
        private cargoService: CargoService
    ) { }

    ngOnInit() {
        this.get();
    }

    get(): void {
        const id = this.route.snapshot.paramMap.get("id")!;
        if (id === "new") {
            this.designacion = <Designaciones>{};
        } else {
            this.designacionService.get(+id).subscribe(dataPackage =>
                this.designacion = <Designaciones>dataPackage.data);
        }
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
      this.fechaOcupada = false;
      this.errorFecha = false;
        this.designacionService.save(this.designacion).subscribe(dataPackage => {
          if (dataPackage.message == "Existe un error en la seleccion de fechas"){
            this.errorFecha = true;
          }

          if (dataPackage.message.includes(" NO ha sido designado/a ")){
            this.fechaOcupada = true;
          } else{
            this.designacion = <Designaciones>dataPackage.data;
            this.goBack();
          }
        });
    }

  searchPersona = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.personaService
          .search(term)
          .pipe(map((response) => <Persona[]>response.data))
          .pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          )
      ),
      tap(() => (this.searching = false))
    );

  resultFormatPersona(value: any) {
    return `${value.nombre} ${value.apellido} - ${value.cuit}`;
  }

  inputFormatPersona(value: any) {
    return `${value?.nombre} ${value?.apellido} - ${value?.cuit}`;
  }

  searchCargo = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.cargoService
          .search(term)
          .pipe(map((response) => <Persona[]>response.data))
          .pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          )
      ),
      tap(() => (this.searching = false))
    );

  resultFormatCargo(value: any) {
    return `${value.nombre} - ${value.tipo}`;
  }

  inputFormatCargo(value: any) {
    return `${value?.nombre} - ${value?.tipo}`;
  }
}
