import { Cargos } from "../cargos/cargo";
import { Persona } from "../personas/persona";

export interface Designaciones{
    id: number,
    situacionRevista: String[45],
    fechaInicio: Date,
    fechaFin: Date,
    persona: Persona,
    cargo: Cargos
}