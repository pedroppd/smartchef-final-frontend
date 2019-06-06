import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ProdutoService{
    constructor(public http: HttpClient){

    }

    findBycategoria(categoria_id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
    }

    findProdutoById(id_produto:string){
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/${id_produto}`);
    }

    getImageFromBucket(id: string): Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/prodd${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }
}