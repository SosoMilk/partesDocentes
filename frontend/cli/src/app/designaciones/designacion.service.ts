import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { DataPackage } from "../data-package";
import { Designaciones } from "./designacion";

@Injectable({
    providedIn: "root",
})

export class DesignacionService {
    private designacionUrl = 'rest/designacion';  // URL to web api

    constructor(
        private http: HttpClient
    ) { }

    all(): Observable<DataPackage> {
        return this.http.get<DataPackage>(this.designacionUrl); // REST
    }


    get(id: number): Observable<DataPackage> {
        return this.http.get<DataPackage>(this.designacionUrl + "/id/" + id);
    }

    save(designacion: Designaciones): Observable<DataPackage> {
        return this.http.post<DataPackage>(this.designacionUrl, designacion);
    }

    // delete(id: number): void{
    //     dCargoS.splice(dCargoS.findIndex(dCargo => dCargo.Dni == dCargo.Dni)!);
    // }

}