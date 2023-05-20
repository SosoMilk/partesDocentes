import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DataPackage } from "../data-package";
import { Articulo } from "./articulo";

@Injectable({
    providedIn: "root",
})

export class ArticuloService {
    private articulosUrl = 'rest/articulos';  // URL to web api

    constructor(
        private http: HttpClient
    ) { }

    all(): Observable<DataPackage> {
        return this.http.get<DataPackage>(this.articulosUrl); // REST
    }


    get(id: number): Observable<DataPackage> {
        return this.http.get<DataPackage>(this.articulosUrl + "/id/" + id); //
    }

    save(articulo: Articulo): Observable<DataPackage> {
        return this.http[articulo.id ? 'put' : 'post']<DataPackage>(this.articulosUrl, articulo);
    }

    delete(articulo: Articulo): Observable<DataPackage> {
        return this.http.delete<DataPackage>(`${this.articulosUrl}/${articulo.id}`); //esto cambiar a otra cosa
    }

}