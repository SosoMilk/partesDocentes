import { Component } from "@angular/core";
import { DesignacionService } from "./designacion.service";
import { Persona } from "../personas/persona";
import { ReporteItem } from "./reporte";

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
// @Component({
//     selector: "app-reporte",
//     template: `
//     <h2>Docentes&nbsp;</h2>
//     <div class="table-responsive">
//       <table class="table table-striped table-sm">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Docente</th>
//             <th>Cantidad de Licencias</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr *ngFor="let item of reporte; index as i">
//             <td>{{ i + 1 }}</td>
//             <td>{{ item.persona.nombre + " " + item.persona.apellido }}</td>
//             <td>{{ item.cantidadLicencias }}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   `,
//     styles: [],
// })
// export class docenteComponent {
//   reporte: ReporteItem[] = [];
//     docentes: Persona[] = [];;

//     constructor(private designacionService: DesignacionService) { }

//     ngOnInit() {
//         this.getReporte();
//     }


//     getReporte(): void {
//       this.designacionService.reporte().subscribe((dataPackage) => {
//         this.reporte = <ReporteItem[]>dataPackage.data;
//       });
//     }
// }