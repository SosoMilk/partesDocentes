export enum Turnos {
    manana = "Mañana",
    tarde = "Tarde",
    Vespertino = "Vespertino",
    noche = "Noche",
}

export interface Division {
    id: number;
    anio: number;
    numero: number;
    orientacion: string;
    turno: Turnos;
}