import { HttpClient } from "@angular/common/http";
import { StorageService } from "../storage.service";
import { API_CONFIG } from "../../config/api.config";
import { Injectable } from "@angular/core";
import { ClienteDTO } from "../../model/cliente.dto";

@Injectable()
export class ClienteService {

    constructor(
        public http: HttpClient, 
        public storage: StorageService) {
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }
    
    findByEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }


    insert(obj : ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    
}