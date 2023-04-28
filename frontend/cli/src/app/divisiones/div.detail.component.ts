import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Division } from "./division";
import { DivisionService } from "./divisiones.service";

@Component({
    selector: "app-detail",
    template: `
    <div *ngIf="divisiones">
      <h2>{{ division.orientacion | uppercase }}</h2>
      <form #form="ngForm">
        <div class="form-group">
          <label for="name">orientacion:</label>
          <input
            [(ngModel)]="division.orientacion"
            Nombre="orientacion"
            placeholder="orientacion"
            class="form-control"
            required=""
            #Nombre="ngModel"
          />
          <div
            *ngIf="Nombre.invalid && (Nombre.dirty || Nombre.touched)"
            class="alert"
          >
            <div *ngIf="Nombre.errors?.['required']">
              La orientacion es requerida.
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="anio">anio:</label>
          <input
            [(ngModel)]="division.anio"
            name="Cuit"
            placeholder="anio"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="name">numero</label>
          <input
            [(ngModel)]="division.numDivision"
            name="numero"
            placeholder="numero"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="turno">turno</label>
          <select
            [(ngModel)]="division.turno"
            class="form-control"
            id="turno"
            name="turno"
          >
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Vespertino">Vespertino</option>
            <option value="Noche">Noche</option>
          </select>
        </div>

        <button (click)="goBack()" class="btn btn-danger">Atrás</button>
        &nbsp;
        <button
          (click)="save()"
          [disabled]="form.invalid"
          class="btn btn-success"
        >
          Guardar
        </button>
      </form>
    </div>
  `,
    styles: [],
})
export class DivDetailComponent {
    division!: Division;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private divisionService: DivisionService
    ) { }

    ngOnInit() {
        this.get();
    }

    get(): void {
        const anio = this.route.snapshot.paramMap.get("anio")!;
        if (anio === "new") {
            this.division= <Division>{};
        } else {
            this.divisionService.get(+anio).subscribe((division) => (this.division = division));
        }
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.divisionService.save(this.division).subscribe((division) => {
            this.division = division;
            this.goBack();
        });
    }


}