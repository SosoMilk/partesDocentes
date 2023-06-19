import { Component } from "@angular/core";
import { DesignacionService } from "./designacion.service";
import { Designaciones } from "./designacion";
import { ModalService } from "../modal.service";

@Component({
    selector: "app-designacion",
    template: `
    <h2>designaciones&nbsp;
      <a routerLink="/designacion/new" class="btn btn-success float-right">Nuevo</a>
    </h2>

    <div *ngIf="errorMessage" class="alert alert-danger alert-dismissible fade show">{{ errorMessage }}</div>

    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>persona</th>
            <th>nombre</th>
            <th>tipo designado</th>
            <th>fecha desde</th>
            <th>fecha hasta</th>
            <th>año</th>
            <th>numero</th>
            <th>turno</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let designacion of designaciones; index as i">
            <td>{{ i + 1 }}</td>
            <td>{{ designacion.persona.nombre +" "+ designacion.persona.apellido }}</td>
            <td>{{ designacion.cargo.nombre }}</td>
            <td>{{ designacion.cargo.tipo }}</td>
            <td>{{ designacion.fechaInicio }}</td>
            <td>{{ designacion.fechaFin }}</td>
            <td>{{ designacion.cargo.division?.anio }}</td>
            <td>{{ designacion.cargo.division?.numero }}</td>
            <td>{{ designacion.cargo.division?.turno }}</td>
            <td>
              
                <a routerLink="/designacion/{{ designacion.id }}">
                <i class="fa fa-pencil mx-2"></i>
                </a>
              
                <button
                    (click)="eliminarDesignacion(designacion)"
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
export class DesignacionesComponent {
  designaciones: Designaciones[] = [];
  errorMessage: string | undefined;

    constructor(private designacionService: DesignacionService,
      private modalService: ModalService) { }

    ngOnInit() {
        this.getdesignaciones();
    }

    getdesignaciones(): void {
        this.designacionService.all()
            .subscribe(dataPackage => this.designaciones = <Designaciones[]>dataPackage.data);
    }

  eliminarDesignacion(designacion: Designaciones): void {
    this.modalService
      .confirm(
        "Eliminar designacion",
        "¿Está seguro de borrar esta designacion?",
        ""
      )
      .then(() => {
        this.designacionService.delete(designacion).subscribe(
          (dataPackage) => {
            this.designaciones = this.designaciones.filter((p) => p !== designacion);
            console.log(dataPackage.message);
          },
          (error) => {
            if (error.status === 500) {
              this.errorMessage = 'No es posible eliminar la designacion con cargo ' + designacion.cargo.nombre + ' y la persona '
              +designacion.persona.nombre+' '+designacion.persona.apellido;
            }
          }
        );
      });
    console.log("no funcionaaaaa");
  }
}