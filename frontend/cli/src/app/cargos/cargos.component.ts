import { Component } from "@angular/core";
import { CargoService } from "./cargos.services";
import { Cargos } from "./cargo";

@Component({
    selector: "app-cargo",
    template: `
    <h2>cargos&nbsp;
      <a routerLink="/cargo/new" class="btn btn-success float-right">Nuevo</a>
    </h2>
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
              
                <i class="fa fa-trash-o text-danger mx-2 "></i>
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

    constructor(private cargoService: CargoService) { }

    ngOnInit() {
        this.getCargos();
    }

    getCargos(): void {
        this.cargoService.all()
            .subscribe(dataPackage => this.cargos = <Cargos[]>dataPackage.data);
    }

    // eliminarPersona(persona: Persona): void {
    //   if (confirm(`¿Está seguro de que desea eliminar a ${persona.Nombre} ${persona.Apellido}?`)) {
    //     this.personaService.delete(persona.Dni).subscribe(() => {this.personas = this.personas.filter((p) => p !== persona);
    //     });
    //   }
    // }
}