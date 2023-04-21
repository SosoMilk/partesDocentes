import { Injectable } from "@angular/core";
import { PERSONAS } from "./mock-personas";
import { Persona } from "./persona";
import { Observable, distinct, of } from 'rxjs';

@Injectable({
    providedIn: "root",
})
export class PersonaService {
    constructor(
        //private http: HttpClient
    ) { }

    //all(): Observable<DataPackage>
    get(Dni: number): Observable<Persona> {
        return of({ ...PERSONAS.find((persona) => persona.Dni === Dni)! }); //esto es< sincronico
        //creamos un objeto observable
    }

    save(persona: Persona): Observable<Persona> {
        if (persona.Dni) {
            // buscamos play que corresponde
            let formerPersona = PERSONAS.find((formerPersona) => formerPersona.Dni === persona.Dni)!;
            // modificamos sus valores
            Object.assign(formerPersona, persona);
            // devolvemos observable
            return of(formerPersona);
        } else {
            persona.Dni = PERSONAS.length + 1;
            PERSONAS.push(persona);
            return of(persona);
        }
    }

    /*delete(id: number): void{
      PLAYS.splice(PLAYS.findIndex(play => play.id == ))
    }*/
}