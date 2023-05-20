import { Articulo } from "../articulos/articulo";
import { Designaciones } from "../designaciones/designacion";
import { Persona } from "../personas/persona";

export interface Licencia {

    id: number,
    pedidoDesde: Date,
    pedidoHasta: Date,
    domicilio: String[90],
    certificadoMedico: false,// boolean,
    persona: Persona,
    articulo: Articulo 
    // designacion: Designaciones
}