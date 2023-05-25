import { Component } from "@angular/core";
import { Licencia } from "./licencia";
import { LicenciaService } from "./licencias.service";

@Component({
    selector: "app-licencias",
    template: `
    <h2>licencias&nbsp;
      <a routerLink="/licencias/new" class="btn btn-success float-right">Nuevo</a>
    </h2>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>persona</th>
            <th>articulo</th>
            <th>fecha desde</th>
            <th>fecha hasta</th>
            <th>certificado médico</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let licencia of licencias; index as i">
            <td>{{ i + 1 }}</td>
            <td>{{ licencia.persona.nombre +" "+ licencia.persona.apellido }}</td>
            <td>{{ licencia.articulo.articulo+"-"+licencia.articulo.descripcion }}</td>
            <td>{{ licencia.pedidoDesde }}</td>
            <td>{{ licencia.pedidoHasta }}</td>
            <td>
              <ng-container *ngIf="licencia.certificadoMedico; else noCertificado">
                Sí
              </ng-container>
              <ng-template #noCertificado>
                No
              </ng-template>
            </td>
            <td>
              
                <a routerLink="/licencias/{{ licencia.id }}">
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
export class LicenciasComponent {
    licencias: Licencia[] = [];;

    constructor(private licenciaService: LicenciaService) { }

    ngOnInit() {
      this.getlicencias();
    }

    getlicencias(): void {
        this.licenciaService.all()
            .subscribe(dataPackage => this.licencias = <Licencia[]>dataPackage.data);
    }

    // eliminarPersona(persona: Persona): void {
    //   if (confirm(`¿Está seguro de que desea eliminar a ${persona.Nombre} ${persona.Apellido}?`)) {
    //     this.personaService.delete(persona.Dni).subscribe(() => {this.personas = this.personas.filter((p) => p !== persona);
    //     });
    //   }
    // }
}