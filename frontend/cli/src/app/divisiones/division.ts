export enum Turnos {
    manana = "Mañana",
    tarde = "Tarde",
    Vespertino = "Vespertino",
    noche = "Noche",
}

export interface Division {
    anio: number;
    numDivision: number;
    orientacion: string;
    turno: Turnos;
}