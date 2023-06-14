import { Division } from "../divisiones/division";
import { Horario } from "../horarios/horario";

export enum TIPOS {
    cargo = "CARGO",
    espacio = "ESPACIO CURRICULAR"
}

export interface Cargos{
    id: number,
    nombre: String,
    tipo: TIPOS,
    fechaInicio: Date,  //probar a cambiar calendar
    fechaFin: Date,
    cargaHoraria: number,
    division: Division | null,
    horario: Horario[]

}