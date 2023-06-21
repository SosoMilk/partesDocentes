import { Time } from "@angular/common";
import { Cargos } from "../cargos/cargo";

export interface Horario {

    id: number,
    dia: string,
    horaInicio: Date,
    horaFin: Date

}