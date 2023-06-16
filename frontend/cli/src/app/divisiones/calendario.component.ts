import { Component } from "@angular/core";
import { CargoService } from "../cargos/cargos.services";
import { HorarioService } from "../horarios/horario.service";
import { Horario } from "../horarios/horario";
import { formatDate } from "@angular/common";

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
    //divisiones = DIVISIONES;
    //horarios: Horario[] = [];
    dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
    horas: Horario [] = [];
    tabla: any = {};

    constructor(
                private cargoService: CargoService,
                private horarioService: HorarioService) { }

    ngOnInit() {
        this.getHoras();
    }

    getHoras(): void {
        this.horarioService.all().subscribe(dataPackage => {
            if (Array.isArray(dataPackage.data)) {
                this.horas = dataPackage.data;
                this.dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
                this.cargarCalendario();
            }
        });
    }

    cargarCalendario(): void {
        if (this.horas.length > 0 && this.dias.length > 0) {
            const horario = formatDate(new Date(), 'HH:mm', 'en-US');
            const dia = this.dias[0];
            const formattedHorario = encodeURIComponent(horario);
            const formattedDia = encodeURIComponent(dia);

            this.cargoService.allCalendario(formattedHorario, formattedDia)
                .subscribe(dataPackage => {
                    this.tabla = dataPackage.data;
                });
        }
    }

    getHorarios(): void {
        this.horarioService.all().subscribe(
            dataPackage => {
                if (Array.isArray(dataPackage.data)) {
                    this.horas = dataPackage.data;
                }
            }
        );
    }
}