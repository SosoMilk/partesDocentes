import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataPackage } from "../data-package";
import { Cargos } from "./cargo";

@Injectable({
    providedIn: "root",
})

export class CargoService {
    private cargoUrl = 'rest/cargo';  // URL to web api

    constructor(
        private http: HttpClient
    ) { }

    all(): Observable<DataPackage> {
        return this.http.get<DataPackage>(this.cargoUrl); // REST
    }


    get(id: number): Observable<DataPackage> {
        return this.http.get<DataPackage>(this.cargoUrl + "/id/" + id);
    }

    save(cargo: Cargos): Observable<DataPackage> {
        return this.http.post<DataPackage>(this.cargoUrl, cargo);
    }


    // delete(id: number): void{
    //     dCargoS.splice(dCargoS.findIndex(dCargo => dCargo.Dni == dCargo.Dni)!);
    // }

}