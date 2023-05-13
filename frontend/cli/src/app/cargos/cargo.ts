import { Division } from "../divisiones/division";

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
    division: Division | null

}