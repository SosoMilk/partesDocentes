import { Cargos, TIPOS } from "./cargo";
import { DIVISIONES } from "../divisiones/mock-diviones";

export const CARGOS: Cargos[]=[
    {
        id: 1,
        nombre: "matematicas",
        tipo: TIPOS.espacio,
        fechaInicio: new Date('2022-01-01'),
        fechaFin: new Date(''),
        cargaHoraria: 5,
        division: DIVISIONES[0]
    },
    {
        id: 2,
        nombre: "Vicedirector/a",
        tipo: TIPOS.cargo,
        fechaInicio: new Date('2022-01-01'),
        fechaFin: new Date(''),
        cargaHoraria: 25,
        division: null
    }
]