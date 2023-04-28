import { Component } from "@angular/core";
import { PERSONAS } from "./mock-personas";
import { Persona } from "./persona";
import { PersonaService } from "./personas.service";

@Component({
    selector: "app-personas",
    template: `
    <h2>Personas&nbsp;
    </h2>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Dni</th>
            <th>Cuit</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Titulo</th>
            <th>Sexo</th>
            <th>Domicilio</th>
            <th>Telefono</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let persona of personas; index as i">
            <td>{{ i + 1 }}</td>
            <td>{{ persona.dni }}</td>
            <td>{{ persona.cuit }}</td>
            <td>{{ persona.nombre }}</td>
            <td>{{ persona.apellido }}</td>
            <td>{{ persona.titulo }}</td>
            <td>{{ persona.sexo }}</td>
            <td>{{ persona.domicilio }}</td>
            <td>{{ persona.telefono }}</td>
            <td>
              <a routerLink="/personas/{{ persona.id }}">
                <i class="fa fa-pencil mx-2"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [],
})
export class PersonasComponent {
  personas = PERSONAS;

  constructor(private personaService: PersonaService) { }

  ngOnInit() {
    this.getPersonas();
  }

  getPersonas(): void {
    this.personaService.all()
      .subscribe(dataPackage => this.personas = <Persona[]>dataPackage.data);
  }

  // eliminarPersona(persona: Persona): void {
  //   if (confirm(`¿Está seguro de que desea eliminar a ${persona.Nombre} ${persona.Apellido}?`)) {
  //     this.personaService.delete(persona.Dni).subscribe(() => {this.personas = this.personas.filter((p) => p !== persona);
  //     });
  //   }
  // }

  //             <a routerLink="/personas/{{ persona.id }}" >
  // <i class="fa fa-trash-o text-danger mx-2 " > </i>
  //   < /a>
}