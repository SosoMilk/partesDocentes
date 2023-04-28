import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DataPackage } from "../data-package";
import { DIVISIONES } from "./mock-diviones";
import { Division } from "./division";


@Injectable({
    providedIn: "root",
})

export class DivisionService {
    private divisionUrl = 'rest/divisiones';  // URL to web api

    constructor(
        private http: HttpClient
    ) { }

    all(): Observable<DataPackage> {
        return this.http.get<DataPackage>(this.divisionUrl); // REST
    }


    get(anio: number): Observable<Division> {
        return of({ ...DIVISIONES.find((division) => division.anio === anio)! });
    }

    save(division: Division): Observable<Division> {
        if (division.anio) {
            // buscamos play que corresponde
            let formerdivision = DIVISIONES.find((formerdivision) => formerdivision.anio === division.anio)!;
            // modificamos sus valores
            Object.assign(formerdivision, division);
            // devolvemos observable
            return of(formerdivision);
        } else {
            division.anio = DIVISIONES.length + 1;
            DIVISIONES.push(division);
            return of(division);
        }
    }


    // delete(id: number): void{
    //     divisionS.splice(divisionS.findIndex(division => division.Dni == division.Dni)!);
    // }

}