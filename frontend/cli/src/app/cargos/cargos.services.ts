import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataPackage } from "../data-package";
import { Cargos } from "./cargo";
import { Time } from "@angular/common";

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

    allCalendario(horario: LocalTime, dia: String): Observable<DataPackage> {
        const horaFormateada = horario.format(DateTimeFormatter.ofPattern('HH:mm'));

        // Luego puedes enviar la hora formateada al backend
        const params = new HttpParams()
            .set('horario', horaFormateada)
            .set('dia', dia);

        return this.http.get<DataPackage>(this.cargoUrl, { params });
        return this.http.get<DataPackage>(this.cargoUrl); // REST
    }

    get(id: number): Observable<DataPackage> {
        return this.http.get<DataPackage>(this.cargoUrl + "/id/" + id);
    }

    save(cargo: Cargos): Observable<DataPackage> {
        return this.http.post<DataPackage>(this.cargoUrl, cargo);
    }

    search(text: string): Observable<DataPackage> {
        return this.http.get<DataPackage>(`${this.cargoUrl}/search/${text}`);
    }
    // delete(id: number): void{
    //     dCargoS.splice(dCargoS.findIndex(dCargo => dCargo.Dni == dCargo.Dni)!);
    // }

}