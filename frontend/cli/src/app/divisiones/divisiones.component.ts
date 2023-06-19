import { Component } from "@angular/core";
import { DIVISIONES } from "./mock-diviones";
import { DivisionService } from "./divisiones.service";
import { Division } from "./division";
import { ModalService } from "../modal.service";

@Component({
    selector: "app-division",
    template: `
    <h2>divisiones&nbsp;
      <a routerLink="/division/new" class="btn btn-success float-right">Nueva</a>
    </h2>

    <div *ngIf="errorMessage" class="alert alert-danger alert-dismissible fade show">{{ errorMessage }}</div>

    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>año</th>
            <th>numero</th>
            <th>orientacion</th>
            <th>turno</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let division of divisiones; index as i">
            <td>{{ i + 1 }}</td>
            <td>{{ division.anio }}</td>
            <td>{{ division.numero }}</td>
            <td>{{ division.orientacion }}</td>
            <td>{{ division.turno }}</td>
            <td>
              
                <a routerLink="/division/{{ division.id }}">
                <i class="fa fa-pencil mx-2"></i>
                </a>
              
                <button
                    (click)="eliminarDivision(division)"
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
export class DivisionesComponent {
  divisiones = DIVISIONES;
  errorMessage: string | undefined;

    constructor(private divisionService: DivisionService,
      private modalService: ModalService) { }

    ngOnInit() {
        this.getDivisiones();
    }

    getDivisiones(): void {
        this.divisionService.all()
            .subscribe(dataPackage => this.divisiones = <Division[]>dataPackage.data);
    }

  eliminarDivision(division: Division): void {
    this.modalService
      .confirm(
        "Eliminar division",
        "¿Está seguro de borrar esta division?",
        ""
      )
      .then(() => {
        this.divisionService.delete(division).subscribe(
          (dataPackage) => {
            this.divisiones = this.divisiones.filter((p) => p !== division);
            console.log(dataPackage.message);
          },
          (error) => {
            if (error.status === 500) {
              this.errorMessage = 'No es posible eliminar la division ' + division.anio + '° ' + division.numero 
              + ' porque está asignada a un cargo.';
            }
          }
        );
      });
    console.log("no funcionaaaaa");
  }
}
