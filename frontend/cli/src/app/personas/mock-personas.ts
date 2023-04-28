import { CHARACTER, Persona } from "./persona";

export const PERSONAS: Persona[]=[
    {
        id:1,
        dni: 44849670n,
        cuit: "27-44849670-3",
        nombre: "Juana",
        apellido: "De Arco",
        titulo: "Profeta iluminada",
        sexo: CHARACTER.F,
        domicilio: "con diosito",
        telefono: "101010101010",
    },
    {
        id: 2,
        dni: 23719670n,
        cuit: "67-23719670-8",
        nombre: "Mario",
        apellido: "Cazas",
        titulo: "Profesor en ingenieria civil",
        sexo: CHARACTER.M,
        domicilio: "civil",
        telefono: "97651682",
    }
]