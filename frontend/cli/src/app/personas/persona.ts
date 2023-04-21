export interface Persona {
    Dni: number; //BigInt
    Cuit: String[30];
    Nombre: String[90];
    Apellido: String[90];
    Titulo: String[90];
    Sexo: String[1];  //CharacterData
    Domicilio: String[90];
    Telefono: String[30];
}