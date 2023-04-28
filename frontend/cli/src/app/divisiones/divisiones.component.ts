import { Component } from "@angular/core";
import { DIVISIONES } from "./mock-diviones";
import { DivisionService } from "./divisiones.service";
import { Division } from "./division";

@Component({
    selector: "app-divisiones",
    template: `
    <h2>divisiones&nbsp;
      <a routerLink="/divisiones/new" class="btn btn-success float-right">Nueva</a>
    </h2>
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
            <td>{{ division.numDivision }}</td>
            <td>{{ division.orientacion }}</td>
            <td>{{ division.turno }}</td>
            <td>
              
                <i class="fa fa-pencil mx-2"></i>

              
                <i class="fa fa-trash-o text-danger mx-2 "></i>
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

    constructor(private divisionService: DivisionService) { }

    ngOnInit() {
        this.getDivisiones();
    }

    getDivisiones(): void {
        this.divisionService.all()
            .subscribe(dataPackage => this.divisiones = <Division[]>dataPackage.data);
    }

    // eliminarPersona(persona: Persona): void {
    //   if (confirm(`¿Está seguro de que desea eliminar a ${persona.Nombre} ${persona.Apellido}?`)) {
    //     this.personaService.delete(persona.Dni).subscribe(() => {this.personas = this.personas.filter((p) => p !== persona);
    //     });
    //   }
    // }
}

//<a routerLink="/division/{{ division.anio }}">