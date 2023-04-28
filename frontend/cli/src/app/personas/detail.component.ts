import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Persona } from "./persona";
import { PersonaService } from "./personas.service";
import { DataPackage } from "../data-package";

@Component({
    selector: "app-detail",
    template: `
    <div *ngIf="persona">
      <h2>{{ persona.nombre | uppercase }}</h2>
      <form #form="ngForm">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input
            [(ngModel)]="persona.nombre"
            name="nombre"
            placeholder="nombre"
            class="form-control"
            required=""
            #Nombre="ngModel"
          />
          <div
            *ngIf="Nombre.invalid && (Nombre.dirty || Nombre.touched)"
            class="alert"
          >
            <div *ngIf="Nombre.errors?.['required']">
              El Nombre de la persona es requerido.
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="apellido">Apellido</label>
          <input
            [(ngModel)]="persona.apellido"
            name="apellido"
            placeholder="Apellido"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="titulo">Titulo:</label>
          <input
            [(ngModel)]="persona.titulo"
            name="titulo"
            placeholder="titulo"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="dni">Dni</label>
          <input
            [(ngModel)]="persona.dni"
            name="dni"
            placeholder="Dni"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="cuit">Cuit</label>
          <input
            [(ngModel)]="persona.cuit"
            name="cuit"
            placeholder="Cuit"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="sexo">Sexo</label>
          <select
            [(ngModel)]="persona.sexo"
            class="form-control"
            id="sexo"
            name="Sexo"
          >
            <option value="M">M</option>
            <option value="F">F</option>
            <option value="O">O</option>
          </select>
        </div>
        <div class="form-group">
          <label for="domicilio">Domicilio</label>
          <input
            [(ngModel)]="persona.domicilio"
            name="domicilio"
            placeholder="Domicilio"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="telefono">Telefono</label>
          <input
            [(ngModel)]="persona.telefono"
            name="telefono"
            placeholder="Telefono"
            class="form-control"
          />
        </div>

        <button (click)="goBack()" class="btn btn-danger">Atrás</button>
        &nbsp;
        <button
          (click)="save()"
          [disabled]="form.invalid"
          class="btn btn-success"
        >Guardar</button>
      </form>
    </div>
  `,
    styles: [],
})

export class DetailComponent {
    persona!: Persona;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private personaService: PersonaService,
    ) { }

    ngOnInit() {
        this.get();
    }

    get(): void {
        const id = this.route.snapshot.paramMap.get("id")!;
      if (id === "new") {
            this.persona = <Persona>{}; 
      } else {
        this.personaService.get(+id).subscribe(dataPackage => 
        this.persona = <Persona>dataPackage.data);
      }
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
      this.personaService.save(this.persona).subscribe(dataPackage => {
        this.persona = <Persona>dataPackage.data;
        //dataPackage =>{this.persona = <Persona>dataPackage.data;
            this.goBack();
        });
    }

  
}