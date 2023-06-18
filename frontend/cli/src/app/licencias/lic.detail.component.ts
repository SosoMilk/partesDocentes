import { Location, JsonPipe } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataPackage } from "../data-package";
import { Licencia } from "./licencia";
import { PersonaService } from "../personas/personas.service";
import { Persona } from "../personas/persona";
import { LicenciaService } from "./licencias.service";
import { Articulo } from "../articulos/articulo";
import { ArticuloService } from "../articulos/articulos.service";
import { Observable, catchError, debounceTime, distinctUntilChanged, map, of, switchMap, tap } from "rxjs";
import { ErrorHandler } from "../errorHandler";
import { NoCargoHandler, TopeDosHandler, TopeSeisHandler, TopeTreintaHandler, YaHayLicenciaFechaHandler, noDesignadoHandler } from "./mensajes";


@Component({
  selector: "app-detail",
  template: `
        <div *ngIf="licencia">
            <h2>Nueva licencia&nbsp;
                <button (click)="save()" [disabled]="form.invalid" class="btn btn-success">Guardar</button>
                &nbsp;
                <button (click)="goBack()" class="btn btn-danger">Atrás</button>
            </h2>


            <form #form="ngForm">
               <div class="form-group">
                <label for="name">Persona:</label>
                <br />
                <input
                  [(ngModel)]="licencia.persona"
                  name="Persona"
                  placeholder="Persona"
                  class="form-control"
                  required
                  [ngbTypeahead]="searchPersona"
                  [editable]="false"
                  [resultFormatter]="resultFormatPersona"
                  [inputFormatter]="inputFormatPersona"
                  type="text"
                />

                    <div class="info-group">
                        <div class="persona-label">DNI</div>
                        <div class="persona-info">{{ licencia.persona?.dni }}</div>
                        <div class="persona-label">Nombre</div>
                        <div class="persona-info">{{ licencia.persona?.nombre }}</div>
                        <div class="persona-label">Apellido</div>
                        <div class="persona-info">{{ licencia.persona?.apellido }}</div>
                    </div>
                </div>
            </form>

            <form #form="ngForm">
                <div class="form-group">
                    <div style="display: inline-block; vertical-align: top; width: 30%;">
                        <label for="licencia">Licencia:</label>
                        <select [(ngModel)]="licencia.articulo" name="licencia" class="form-control">
                            <option *ngFor="let licencia of articulos" [ngValue]="licencia">
                                {{ licencia.articulo + ': ' + licencia.descripcion }}
                            </option>
                        </select>
                    </div>

                    <div class="info-group">
                        <div class="persona-label">Articulo</div>
                        <div class="persona-info">{{ licencia.articulo?.articulo }}</div>
                        <div class="persona-label">Descripcion</div>
                        <div class="persona-info">{{ licencia.articulo?.descripcion }}</div>
                    </div>
                </div>
            </form>

            <div>&nbsp;</div>

            <form #form="ngForm">
                <div class="form-group">
                    <div style="display: inline-block;">
                        <label for="pedidoDesde">vigente desde: </label>
                        <label>
                            <input [(ngModel)]="licencia.pedidoDesde" type="date" name="pedido desde" required pattern="yyyy-MM-dd" />
                            <span class="validity"></span>
                        </label>
                    </div>
                    <div style="display: inline-block; margin-left: 150px;">
                        <label for="pedidoHasta">vigente hasta: </label>
                        <label>
                            <input [(ngModel)]="licencia.pedidoHasta" type="date" name="pedido hasta" required pattern="yyyy-MM-dd" />
                            <span class="validity"></span>
                        </label>
                    </div>
                </div>

                <div style="margin-bottom: 50px;"></div>

                <div class="row">
                    <div class="col">
                        <label for="certificadoMedico">Certificado médico:&nbsp;</label>
                        <input type="checkbox" [(ngModel)]="licencia.certificadoMedico" name="certificadoMedico" />
                    </div>
                </div>
            </form>
        </div>

       <ng-container *ngFor="let handler of errorHandlers; let i = index">
          <div *ngIf="handler.displayError" class="alert alert-danger alert-dismissible fade show">
            {{ respuesta }}
            <button 
              type="button"
              class="btn-close" 
              aria-label="Close"
              (click)="handler.displayError = false"
            ></button>
          </div>
        </ng-container>
   
    `,
  styles: [
    `
			.form-control {
				width: 300px;
			}

            .persona-info {
                display: inline-block;
                margin-left: 5px;
                margin-right: 20px;
                vertical-align: top;
            }

            .persona-label {
                width: 120px;
                height: 35px;
                background-color: #9fb6f2;
                text-align: center;
                line-height: 50px;
                margin-bottom: 5px;
                font-weight: bold;
                border-radius: 10px;
            }

            .info-group {
                display: flex;
                align-items: center;
                margin-top: 5px;
            }

            select.form-control {
                width: 100%;
            }

            .espacio-label {
                margin-left: 85px;
            }
		`,
  ],
})
export class LicDetailComponent {
  licencia!: Licencia;
  personaes: Persona[] = [];
  articulos: Articulo[] = [];
  searching: boolean = false;
  searchFailed: boolean = false;
  errorHandled: boolean = false;
  respuesta: string | undefined;
  errorHandlers: ErrorHandler[] = [
    new YaHayLicenciaFechaHandler(),
    new TopeSeisHandler(),
    new TopeTreintaHandler(),
    new NoCargoHandler(),
    new TopeDosHandler(),
    new noDesignadoHandler()
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private licenciaService: LicenciaService,
    private personaService: PersonaService,
    private articuloService: ArticuloService
  ) { this.respuesta = "";}

  ngOnInit() {
    this.getArticulos();
    this.get();
  }

  getArticulos(): void {
    this.articuloService.all().subscribe((dataPackage) => {
      if (Array.isArray(dataPackage.data)) {
        this.articulos = dataPackage.data;
      }
    });
  }

  get(): void {
    const id = this.route.snapshot.paramMap.get("id")!;
    if (id === "new") {
      this.licencia = <Licencia>{};
    } else {
      this.licenciaService.get(+id).subscribe((dataPackage) => {
        this.licencia = <Licencia>dataPackage.data;
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.errorHandlers.forEach((handler) => (handler.displayError = false));

    this.licenciaService.save(this.licencia).subscribe((dataPackage) => {
      console.log(dataPackage.message);

      for (const handler of this.errorHandlers) {
        if (handler.handleError(dataPackage.message)) {
          this.respuesta = dataPackage.message;
          this.errorHandled = true;
          break;
        }
      }

      if (!this.errorHandled) {
        this.licencia = <Licencia>dataPackage.data;
        this.goBack();
      }
    });
  }

  searchPersona = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.personaService
          .search(term)
          .pipe(map((response) => <Persona[]>response.data))
          .pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          )
      ),
      tap(() => (this.searching = false))
    );

  resultFormatPersona(value: any) {
    return `${value.nombre} ${value.apellido} - ${value.cuit}`;
  }

  inputFormatPersona(value: any) {
    return `${value?.nombre} ${value?.apellido} - ${value?.cuit}`;
  }
}