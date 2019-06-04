import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { CategoriaDTO } from "../../model/categoria.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";


@Injectable()
export class CategoriaService{
    constructor(public http: HttpClient){

    }

    findAll() : Observable<CategoriaDTO[]>{
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`); //return an list of category
    }
}