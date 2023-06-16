import { Component } from "@angular/core";
import { DesignacionService } from "./designacion.service";
import { Persona } from "../personas/persona";

@Component({
    selector: "app-reporte",
    template: `
    <h2>Docentes&nbsp;</h2>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Docente</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let persona of docentes; index as i">
            <td>{{ i + 1 }}</td>
            <td>{{ persona.nombre +" "+ persona.apellido }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
    styles: [],
})
export class docenteComponent {
    docentes: Persona[] = [];;

    constructor(private designacionService: DesignacionService) { }

    ngOnInit() {
        this.getpersona();
    }

    getpersona(): void {
            this.designacionService.reporte()
                .subscribe(dataPackage => {
                    this.docentes = <Persona[]>dataPackage.data;
                });
    }
}