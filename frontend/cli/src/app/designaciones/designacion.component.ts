import { Component } from "@angular/core";
import { DesignacionService } from "./designacion.service";
import { Designaciones } from "./designacion";

@Component({
    selector: "app-designacion",
    template: `
    <h2>designaciones&nbsp;
      <a routerLink="/designacion/new" class="btn btn-success float-right">Nuevo</a>
    </h2>
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
              
                <i class="fa fa-trash-o text-danger mx-2 "></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
    styles: [],
})
export class DesignacionesComponent {
  designaciones: Designaciones[] = [];;

    constructor(private designacionService: DesignacionService) { }

    ngOnInit() {
        this.getdesignaciones();
    }

    getdesignaciones(): void {
        this.designacionService.all()
            .subscribe(dataPackage => this.designaciones = <Designaciones[]>dataPackage.data);
    }

    // eliminarPersona(persona: Persona): void {
    //   if (confirm(`¿Está seguro de que desea eliminar a ${persona.Nombre} ${persona.Apellido}?`)) {
    //     this.personaService.delete(persona.Dni).subscribe(() => {this.personas = this.personas.filter((p) => p !== persona);
    //     });
    //   }
    // }
}