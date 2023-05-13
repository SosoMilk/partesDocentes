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
    private divisionUrl = 'rest/division';  // URL to web api

    constructor(
        private http: HttpClient
    ) { }

    all(): Observable<DataPackage> {
        return this.http.get<DataPackage>(this.divisionUrl); // REST
    }


    get(id: number): Observable<DataPackage> {
        return this.http.get<DataPackage>(this.divisionUrl + "/id/" + id);
    }

    save(division: Division): Observable<DataPackage> {
        return this.http.post<DataPackage>(this.divisionUrl, division);
    }


    // delete(id: number): void{
    //     divisionS.splice(divisionS.findIndex(division => division.Dni == division.Dni)!);
    // }

}