import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Division } from "./division";
import { DivisionService } from "./divisiones.service";
import { DataPackage } from "../data-package";

@Component({
    selector: "app-detail",
    template: `
    <div *ngIf="division">
      <h2>Nueva Division&nbsp;
      <button (click)="save()" [disabled]="form.invalid" class="btn btn-success" >Guardar</button>
        &nbsp;
        <button (click)="goBack()" class="btn btn-danger">Atrás</button>
      </h2>
      <form #form="ngForm">
      <div class="form-group">
          <div style="display: inline-block;">
            <label for="anio">anio:</label>
            <input
              [(ngModel)]="division.anio"
              name="Cuit"
              placeholder="anio"
              class="form-control"
              style="width: 140%;"
              />
          </div>
          <div style="display: inline-block; margin-left: 150px;">
            <label for="name">numero</label>
            <input
              [(ngModel)]="division.numero"
              name="numero"
              placeholder="numero"
              class="form-control"
              style="width: 140%;"
              />
          </div>
      </div>

      
      <div class="form-group">
        <div style="display: inline-block; vertical-align: top;">
          <label for="orientacion">orientacion:</label>
          <input
            [(ngModel)]="division.orientacion"
            name="orientacion"
            placeholder="orientacion"
            class="form-control"
            style="width: 140%;"
          />
        </div>

        <div style="display: inline-block; margin-left: 150px; vertical-align: top;">
          <label for="name">turno</label>
          <select
            [(ngModel)]="division.turno"
            class="form-control"
            id="turno"
            name="turno"
            style="width: 305%;"
          >
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Vespertino">Vespertino</option>
            <option value="Noche">Noche</option>
          </select>
        </div>
      </div>

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
      const id = this.route.snapshot.paramMap.get("id")!;
      if (id === "new") {
            this.division= <Division>{};
        } else {
        this.divisionService.get(+id).subscribe(dataPackage =>
          this.division = <Division>dataPackage.data); 
        }
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
      if (!this.division.anio || !this.division.numero || !this.division.orientacion) {
        alert("Los campos año, numero y orientacion son obligatorios.");
        return;
      }
      this.divisionService.save(this.division).subscribe(dataPackage => {
        this.division = <Division>dataPackage.data;
        this.goBack();
      });
    }


}