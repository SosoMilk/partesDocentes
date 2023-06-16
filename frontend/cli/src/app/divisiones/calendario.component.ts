import { Component } from "@angular/core";
import { DIVISIONES } from "./mock-diviones";
import { DivisionService } from "./divisiones.service";
import { Division } from "./division";
import { CargoService } from "../cargos/cargos.services";

@Component({
    selector: "app-calendario",
    template: `
    <h2>Calendario&nbsp;</h2>

    <table class="table table-striped table-sm">
                <thead class="table-dark">
                    <tr>
                        <th>Hora</th>
                        <th *ngFor="let dia of dias">{{dia}}</th>
                    </tr>
                </thead>
                <tbody class="table-dark">
                    <tr *ngFor="let hora of horas">
                        <th>{{hora}}</th>
                        <ng-container *ngFor="let dia of dias">
                            <th *ngFor="let cargos of tabla[hora + dia]">
                                {{cargos}}
                            </th>
                        </ng-container>
                    </tr>
                </tbody>
            </table>
  `,
    styles: [],
})
export class CalendarioComponent {
    divisiones = DIVISIONES;

    constructor(private divisionService: DivisionService,
                private cargoService: CargoService) { }

    ngOnInit() {
        this.getDivisiones();
    }

    getDivisiones(): void {
        this.divisionService.all()
            .subscribe(dataPackage => this.divisiones = <Division[]>dataPackage.data);
    }

}