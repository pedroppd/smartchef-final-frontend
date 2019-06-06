import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { API_CONFIG } from "../config/api.config";
import { Cart } from "../model/cart";

@Injectable()
export class StorageService {

    constructor() {
    }

    getCart(): Cart {
        let str = localStorage.getItem(STORAGE_KEYS.cart);

        if (str != null) {
            return JSON.parse(str);
        } else {
            return null;
        }
    }

    setCart(obj: Cart) {
        if (obj != null) {
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));

        } else {
            localStorage.removeItem(STORAGE_KEYS.cart);
        }
    }

}