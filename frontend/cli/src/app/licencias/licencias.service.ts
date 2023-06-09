import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DataPackage } from "../data-package";

import { Data } from "@angular/router";
import { Licencia } from "./licencia";
import { formatDate } from "@angular/common";

@Injectable({
    providedIn: "root",
})

export class LicenciaService {
    private licenciasUrl = 'rest/licencias';  // URL to web api

    constructor(
        private http: HttpClient
    ) { }

    all(): Observable<DataPackage> {
        return this.http.get<DataPackage>(this.licenciasUrl); // REST
    }

    allFecha(fecha: Date): Observable<DataPackage> {
        const formattedFecha = formatDate(fecha, 'yyyy-MM-dd', 'en-US'); // Formatear la fecha en el formato esperado por el backend
        const url = `${this.licenciasUrl}/parteDiario/${formattedFecha}`; // Construir la URL de la solicitud

        return this.http.get<DataPackage>(url);
    }

    get(id: number): Observable<DataPackage> {
        return this.http.get<DataPackage>(this.licenciasUrl + "/id/" + id); //
    }

    save(licencia: Licencia): Observable<DataPackage> {
        return this.http[licencia.id ? 'put' : 'post']<DataPackage>(this.licenciasUrl, licencia);
    }

    delete(licencia: Licencia): Observable<DataPackage> {
        return this.http.delete<DataPackage>(`${this.licenciasUrl}/${licencia.id}`); //esto cambiar a otra cosa
    }

}