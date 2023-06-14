import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Cargos, TIPOS } from "./cargo";
import { DataPackage } from "../data-package";
import { CargoService } from "./cargos.services";
import { Division } from "../divisiones/division";
import { DivisionService } from "../divisiones/divisiones.service";
import { ModalService } from "../modal.service";
import { Horario } from "../horarios/horario";

@Component({
    selector: "app-detail",
    template: `
    <div *ngIf="cargo">
      <h2>Nueva Cargo&nbsp;
      <button (click)="save()" [disabled]="form.invalid" class="btn btn-success" >Guardar</button>
        &nbsp;
        <button (click)="goBack()" class="btn btn-danger">Atrás</button>
      </h2>
      <form #form="ngForm">
      <div class="form-group">
          <div style="display: inline-block;">
            <label for="nombre">nombre:</label>
            <input
              [(ngModel)]="cargo.nombre"
              name="nombre"
              placeholder="nombre"
              class="form-control"
              style="width: 140%;"
              />
          </div>
          <div style="display: inline-block; margin-left: 150px;">
            <label for="name">tipo</label>
            <select
            [(ngModel)]="cargo.tipo"
            class="form-control"
            id="tipo"
            name="tipo"
            style="width: 165%;"
            (change)="divisionDisabled = cargo.tipo === 'CARGO'"
          >
            <option value="CARGO">CARGO</option>
            <option value="ESPACIO_CURRICULAR">ESPACIO CURRICULAR</option>
          </select>
          </div>
      </div>
      

        <div style="display: inline-block; vertical-align: top;">
          <label for="cargaHoraria">carga horaria:</label>
          <input
            [(ngModel)]="cargo.cargaHoraria"
            name="cargaHoraria"
            placeholder="cargaHoraria"
            class="form-control"
            style="width: 140%;"
          />
        </div>

      <form #form="ngForm">
      <div class="form-group">
          <div style="display: inline-block;">
            <label for="vigente desde">vigente desde: </label>
            <label>
              <input
                [(ngModel)]="cargo.fechaInicio"
                type="date"
                name="vigente desde"
                required
          pattern="yyyy-MM-dd"
                />
              <span class="validity"></span>
            </label>
          </div>
          <div style="display: inline-block; margin-left: 150px;">
            <label for="vigente hasta ">vigente hasta: </label>
            <label>
              <input
                [(ngModel)]="cargo.fechaFin"
                type="date"
                name="vigente desde"
                required 
                pattern="yyyy-MM-dd"/>
              <span class="validity"></span>
            </label>
          </div>
      </div>

      <style>
        .division-info {
        display: inline-block;
        margin-left: 20px;
        vertical-align: top;
      }

        .division-label {
          width: 180px;
          height: 35px;
          background-color: #ccc;
          text-align: center;
          line-height: 50px;
          margin-bottom: 5px;
          font-weight: bold;
        }
      </style>

      <form #form="ngForm">
        <div class="form-group">
          <div style="display: inline-block; vertical-align: top;">
            <label for="division">División:</label>
            <select
              [(ngModel)]="cargo.division"
              name="division"
              class="form-control"
              style="width: 163%;"
              [disabled]="divisionDisabled"
            >
              <option *ngFor="let division of divisiones" [ngValue]="division">
                {{ division.anio + '-' + division.numero + '-' + division.orientacion + '-' + division.turno }}
              </option>
            </select>
          </div>
          
          <div style="display: inline-block; margin-left: 200px;">
            <div class="division-label">Año&nbsp;&nbsp;&nbsp;Número&nbsp;&nbsp;&nbsp;Turno</div>
            <div class="division-info">{{ cargo.division?.anio }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ cargo.division?.numero }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ cargo.division?.turno }}</div>
          </div>
        </div>
      </form>

        <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Dia</th>
                <th>Hora</th>
                <th>
                  <button (click)="addHorario()" class="btn btn-success">
                    Agregar
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let horario of cargo.horario; index as i">
                <td>{{ i + 1 }}</td>
                <td>
                  <input
                    name="dia{{ i }}"
                    [(ngModel)]="horario.dia"
                    class="form-control"
                  />
                </td>
                <td>
                  <input
                    name="hora{{ i }}"
                    [(ngModel)]="horario.hora"
                    class="form-control"
                  />
                </td>
                <td>
                  <button
                    (click)="removeHorario(horario)"
                    class="btn btn-default"
                  >
                    <i class="fa fa-remove"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </form>
 
  `,
    styles: [],
})
export class CarDetailComponent {
    cargo!: Cargos;
    divisionDisabled = false;
    divisiones: Division[] = [];

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private cargoService: CargoService,
        private divisionService: DivisionService,
        private modalService: ModalService
    ) {
     }

    ngOnInit() {
      if(Event){

        this.get();
      }
      this.getDivisiones();
    }

  getDivisiones(): void {
    this.divisionService.all().subscribe(
      dataPackage => {
        if (Array.isArray(dataPackage.data)) {
          this.divisiones = dataPackage.data;
        }
      }
    );
  }

    get(): void {
        const id = this.route.snapshot.paramMap.get("id")!;
      if (id === "new") {
        this.cargo = <Cargos>{};
      } else {
        this.cargoService.get(+id).subscribe(dataPackage => {
          this.cargo = <Cargos>dataPackage.data;
          if (!this.cargo.horario) {
            this.cargo.horario = [];
          }
        });
      }
        // if (id === "new") {
        //     this.cargo = <Cargos>{};
        // } else {
        //     this.cargoService.get(+id).subscribe(dataPackage =>
        //         this.cargo = <Cargos>dataPackage.data);
        // }
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        if (!this.cargo.nombre) {
            alert("El campos nombre es obligatorio.");
            return;
        }
        
        this.cargoService.save(this.cargo).subscribe(dataPackage => {
            this.cargo = <Cargos>dataPackage.data;
            this.goBack();
        });
    }

  addHorario(): void {
    if (!this.cargo.horario) {
      this.cargo.horario = [];
    }
    this.cargo.horario.push({ id: 0, dia: '', hora: 0 });
  }

  removeHorario(horario: Horario): void {
    this.modalService
      .confirm(
        "Eliminar horario",
        "¿Está seguro de borrar este horario?",
        "El cambio no se confirmará hasta que no guarde el cargo."
      )
      .then(
        () => {
          let horarios = this.cargo.horario;
          horarios.splice(horarios.indexOf(horario), 1);
        },
        () => { }
      );
  }
}