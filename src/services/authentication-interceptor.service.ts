import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from "../environments/environment";
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        request = request.clone({
            headers: request.headers.set("Access-Control-Allow-Origin", "*"),
        });
        request = request.clone({
            headers: request.headers.set("Access-Control-Allow-Methods", "*"),
        });

        document
            .getElementsByTagName("body")[0]
            .insertAdjacentHTML(
                "beforeend",
                "<div id='loading_mark' style='z-index:100000;text-align:center;position:fixed;width:100%;height:100%;background:rgba(255, 255, 255, 0.8);top:0px;left:0px;filter:alpha(opacity=40);'><img style='height:150px;margin-top:300px;width:150px;' src='./../assets/images/loading-spinner.gif'/></div>"
            );

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    const element = document.getElementById("loading_mark");
                    element.parentNode.removeChild(element);
                    if (event.status == 401) {
                        //
                    }
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status == 401) {
                }
                const element = document.getElementById("loading_mark");
                element.parentNode.removeChild(element);
                return throwError(error);
            })
        );
    }
}
