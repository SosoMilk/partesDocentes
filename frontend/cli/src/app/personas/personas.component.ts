import { Component } from "@angular/core";
import { PERSONAS } from "./mock-personas";

@Component({
    selector: "app-personas",
    template: `
    <h2>
      Personas&nbsp;
      <a routerLink="/personas/new" class="btn btn-success float-right"
        >Nueva persona</a
      >
    </h2>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Dni</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let persona of personas; index as i">
            <td>{{ i + 1 }}</td>
            <td>{{ persona.Dni }}</td>
            <td>{{ persona.Nombre }}</td>
            <td>{{ persona.Apellido }}</td>
            <td>
              <a routerLink="/persona/{{ persona.Dni }}">
                <i class="fa fa-pencil mx-2"></i>
              </a>

              <a>
                <i class="fa fa-trash-o text-danger mx-2 "></i>
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

}