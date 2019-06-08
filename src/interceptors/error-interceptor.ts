import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { AlertController } from "ionic-angular";
import { FieldMessage } from "../pages/model/fieldmessage";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public alert: AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

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

                    case 422:
                        this.handler422(errorObj);
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

    handler422(errorObj) {
        let alert = this.alert.create({
            title: 'Erro 422: Validação',
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    handlerDefaultError(errorObj) {
        let alert = this.alert.create({
            title: 'Erro :(',
            message: 'Ocorreu um erro inesperado:' + errorObj.error,
            buttons: [{ text: 'Ok' }]

        });
        alert.present();
    }

    private listErrors(messages: FieldMessage[]): string {
        let s: string = '';
        for (var i = 0; i < messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
        }
        return s;
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};