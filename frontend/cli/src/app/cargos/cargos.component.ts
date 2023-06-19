import { Component } from "@angular/core";
import { CargoService } from "./cargos.services";
import { Cargos } from "./cargo";
import { ModalService } from "../modal.service";

@Component({
    selector: "app-cargo",
    template: `
    <h2>cargos&nbsp;
      <a routerLink="/cargo/new" class="btn btn-success float-right">Nuevo</a>
    </h2>
    
    <div *ngIf="errorMessage" class="alert alert-danger alert-dismissible fade show">{{ errorMessage }}</div>

    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>nombre</th>
            <th>tipo designado</th>
            <th>fecha desde</th>
            <th>fecha hasta</th>
            <th>carga horaria</th>
            <th>año</th>
            <th>numero</th>
            <th>turno</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let cargo of cargos; index as i">
            <td>{{ i + 1 }}</td>
            <td>{{ cargo.nombre }}</td>
            <td>{{ cargo.tipo }}</td>
            <td>{{ cargo.fechaInicio }}</td>
            <td>{{ cargo.fechaFin }}</td>
            <td>{{ cargo.cargaHoraria }}</td>
            <td>{{ cargo.division?.anio }}</td>
            <td>{{ cargo.division?.numero }}</td>
            <td>{{ cargo.division?.turno }}</td>
            <td>
              
                <a routerLink="/cargo/{{ cargo.id }}">
                <i class="fa fa-pencil mx-2"></i>
                </a>
              
                <button
                    (click)="eliminarCargo(cargo)"
                    class="btn btn-default"
                  >
                <i class="fa fa-trash-o text-danger mx-2 "></i>
                </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
    styles: [],
})
export class CargosComponent {
  cargos : Cargos[] = [];
  errorMessage: string | undefined;

    constructor(private cargoService: CargoService,
      private modalService: ModalService) { }

    ngOnInit() {
        this.getCargos();
    }

    getCargos(): void {
        this.cargoService.all()
            .subscribe(dataPackage => this.cargos = <Cargos[]>dataPackage.data);
    }

  eliminarCargo(cargo: Cargos): void {
    this.modalService
      .confirm(
        "Eliminar cargo",
        "¿Está seguro de borrar este cargo?",
        ""
      )
      .then(() => {
        this.cargoService.delete(cargo).subscribe(
          (dataPackage) => {
            this.cargos = this.cargos.filter((p) => p !== cargo);
            console.log(dataPackage.message);
          },
          (error) => {
            if (error.status === 500) {
              this.errorMessage = 'No es posible eliminar el cargo ' + cargo.nombre + ' porque ya tiene una persona designada.';
            }
          }
        );
      });
    console.log("no funcionaaaaa");
  }
}