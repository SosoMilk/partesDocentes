import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DataPackage } from "../data-package";

import { PERSONAS } from "./mock-personas";
import { Persona } from "./persona";
import { Data } from "@angular/router";

@Injectable({
    providedIn: "root",
})

export class PersonaService {
    private personasUrl = 'rest/personas';  // URL to web api

    constructor(
        private http: HttpClient
    ) { }

    all(): Observable<DataPackage> {
        return this.http.get<DataPackage>(this.personasUrl); // REST
    }


    get(id: number): Observable<DataPackage> {
        return this.http.get<DataPackage>(this.personasUrl + "/id/"+id); //
    }

    save(persona: Persona): Observable<DataPackage> {
        return this.http.post<DataPackage>(this.personasUrl, persona);
    }

    
    // delete(id: number): void{
    //     PERSONAS.splice(PERSONAS.findIndex(persona => persona.Dni == persona.Dni)!);
    // }

}