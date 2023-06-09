import { Component } from "@angular/core";
import { Licencia } from "./licencia";
import { LicenciaService } from "./licencias.service";

@Component({
    selector: "app-parteDiario",
    template: `
    
    <div class="form-group">
    <div style="display: inline-block;">
    <label for="parteDiario">Ingresar fecha de parte diario: </label>
    <label>
    <input [(ngModel)]="fechaParteDiario" type="date" name="pedido desde" required pattern="yyyy-MM-dd" />
    <span class="validity"></span>
    </label>
    </div>
      &nbsp;<button (click)="buscarLicencias()" class="btn btn-success">Buscar</button>
      &nbsp;<button (click)="resetFecha()" class="btn btn-danger">Reset</button>
    </div>

   <h2>Parte Diario&nbsp;{{ fechaSeleccionada }}</h2>

    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>persona</th>
            <th>articulo</th>
            <th>fecha desde</th>
            <th>fecha hasta</th>
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
      
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
            .parte-info {
                display: inline-block;
                margin-left: 5px;
                margin-right: 20px;
                vertical-align: top;
            }

            .parte-label {
                width: 650px;
                height: 35px;
                background-color: #9fb6f2;
                text-align: center;
                line-height: 50px;
                margin-bottom: 105px;
                margin-left: 55px;
                font-weight: bold;
                border-radius: 10px;
            }

		`,
  ],
})
export class ParteDiarioComponent {
  fechaParteDiario: Date = new Date(); // Establecer una fecha predeterminada
  fechaParteDiarioInicial: Date = new Date();
    licencias: Licencia[] = [];
  fechaSeleccionada: string | null = null;

    constructor(private licenciaService: LicenciaService) { }

    ngOnInit() {
      this.fechaParteDiarioInicial = new Date();
        this.getlicencias();
    }

    getlicencias(): void {
      if (this.fechaParteDiario) {
        this.licenciaService.allFecha(this.fechaParteDiario)
          .subscribe(dataPackage => {
            this.licencias = <Licencia[]>dataPackage.data;
          });
      } else {
        this.licencias = [];
        this.fechaSeleccionada = null;
      }
    }

  buscarLicencias(): void {
    this.getlicencias();
    this.fechaSeleccionada = this.fechaParteDiario?.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  resetFecha(): void {
    this.fechaParteDiario = this.fechaParteDiarioInicial; // Restablecer la fecha a la fecha inicial
    //this.fechaSeleccionada = this.fechaParteDiario?.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    this.getlicencias();
  }

  // formatDate(date: Date): string {
  //   const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  //   return date.toLocaleDateString('es-ES', options);
  // }
}