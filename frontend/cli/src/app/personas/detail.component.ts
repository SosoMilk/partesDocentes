import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PERSONAS } from "./mock-personas";
import { Persona } from "./persona";
import { PersonaService } from "./personas.service";

@Component({
    selector: "app-detail",
    template: `
    <div *ngIf="persona">
      <h2>{{ persona.Nombre | uppercase }}</h2>
      <form #form="ngForm">
        <div class="form-group">
          <label for="Nombre">Nombre:</label>
          <input
            [(ngModel)]="persona.Nombre"
            Nombre="Nombre"
            placeholder="Nombre"
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
          <label for="Nombre">Código:</label>
          <input
            [(ngModel)]="persona.Cuit"
            name="Cuit"
            placeholder="Código"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="Apellido">Tipo</label>
          <input
            [(ngModel)]="persona.Apellido"
            name="Apellido"
            placeholder="Código"
            class="form-control"
          />
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
export class DetailComponent {
    persona!: Persona;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private personaService: PersonaService
    ) { }

    ngOnInit() {
        this.get();
    }

    get(): void {
        const Dni = this.route.snapshot.paramMap.get("Dni")!;
        if (Dni === "new") {
            this.persona = <Persona>{};
        } else {
            this.personaService.get(+Dni).subscribe((persona) => (this.persona = persona));
        }
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.personaService.save(this.persona).subscribe((persona) => {
            this.persona = persona;
            this.goBack();
        });
    }
}