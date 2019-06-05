import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { AlertController } from "ionic-angular";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public alert: AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Passou :)');
        return next.handle(req)
            .catch((error, caught) => {
                let errorObj = error;
                if (errorObj.error) {
                    errorObj = errorObj.error;
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }

                switch (errorObj.status) {
                    case 403:
                        this.handler403();
                        break;

                    default:
                        this.handlerDefaultError(errorObj);
                        break;
                }

                console.log('Error detectado pelo interceptor:');
                console.log(errorObj)
                return Observable.throw(errorObj);
            }) as any;
    }

    handler403() {
    }

    handlerDefaultError(errorObj) {
        let alert = this.alert.create({
            title: 'Erro :(',
            message: 'Ocorreu um erro inesperado:' + errorObj.error,
            buttons: [{ text: 'Ok' }]
            
        });
        alert.present();
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};