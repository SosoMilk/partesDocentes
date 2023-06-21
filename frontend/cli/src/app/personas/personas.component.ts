import { Component } from "@angular/core";
import { PERSONAS } from "./mock-personas";
import { Persona } from "./persona";
import { PersonaService } from "./personas.service";
import { ModalService } from "../modal.service";

@Component({
    selector: "app-personas",
    template: `
    <h2>Personas&nbsp;
    <a routerLink="/personas/new" class="btn btn-success float-right">Nueva</a>
    </h2>
    
    <div *ngIf="errorMessage" class="alert alert-danger alert-dismissible fade show">{{ errorMessage }}</div>

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
              &nbsp;
              
                <button
                    (click)="eliminarPersona(persona)"
                    class="btn btn-default"
                  >
                <i class="fa fa-trash-o text-danger mx-2 "></i>
                </button>
                
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
  errorMessage: string | undefined;

  constructor(private personaService: PersonaService,
    private modalService: ModalService) { }

  ngOnInit() {
    this.getPersonas();
  }

  getPersonas(): void {
    this.personaService.all()
      .subscribe(dataPackage => this.personas = <Persona[]>dataPackage.data);
  }

  eliminarPersona(persona: Persona): void {
    this.modalService
      .confirm(
        "Eliminar persona",
        "¿Está seguro de borrar a esta persona?",
        ""
      )
      .then(() => {
        this.personaService.delete(persona).subscribe(
          (dataPackage) => {
            this.personas = this.personas.filter((p) => p !== persona);
            console.log(dataPackage.message);
          },
          (error) => {
            if (error.status === 500) {
              this.errorMessage = 'No es posible eliminar a '+persona.nombre+' '+persona.apellido+' porque está asignada a una designación.';
            }
          }
        );
      });
    console.log("no funcionaaaaa");
  }


}