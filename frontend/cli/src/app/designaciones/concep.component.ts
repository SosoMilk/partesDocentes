import { Component } from "@angular/core";
import { DesignacionService } from "./designacion.service";
import { Persona } from "../personas/persona";
import { ReporteItem } from "./reporte";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-reporte",
  template: `
    <h2>Docentes&nbsp;</h2>
  
  <div style="display: inline-block;">
  <input [(ngModel)]="fechaReporte" type="month" name="mes" max=fechaMax>
  &nbsp;<button (click)="ngOnInit()" class="btn btn-success">Buscar</button>
  </div>

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
  docentes: Persona[] = [];
  fechaMax= new Date;
  fechaReporte = new Date;

  constructor(private designacionService: DesignacionService) { }

  ngOnInit() {
    this.getpersona();
  }

  getpersona(): void {
    const mes = formatDate(this.fechaReporte, 'MM', 'en-US');
    this.designacionService.reporte(mes)
      .subscribe(dataPackage => {
        this.docentes = <Persona[]>dataPackage.data;
      });
  }
}