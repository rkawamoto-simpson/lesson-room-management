import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { AlertSuccessComponent } from "src/shared/components/alerts/alert-success/alert-success.component";
import { environment } from "./../environments/environment";

@Injectable({
    providedIn: "root",
})
export class RestfulService {
    dialog: MatDialog;
    constructor(protected http: HttpClient, public router: Router) {}

    private getApiUrl() {
        return environment.host;
    }

    protected doGet(path: string): Observable<any> {
        const options = this.getHeaders();
        return this.http.get(`${this.getApiUrl()}/${path}`, options).pipe(
            map((res) => res),
            catchError((err) => this.getError(err))
        );
    }

    protected doPost(path: string, data): Observable<any> {
        const options = this.getHeaders();
        return this.http
            .post(`${this.getApiUrl()}/${path}`, data, options)
            .pipe(
                map((res) => res),
                catchError((err) => this.getError(err))
            );
    }

    protected doUpload(path: string, data): Observable<any> {
        const options = this.getHeadersUpload();
        return this.http
            .post(`${this.getApiUrl()}/${path}`, data, options)
            .pipe(
                map((res) => res),
                catchError((err) => this.getError(err))
            );
    }

    protected doDelete(path: string): Observable<any> {
        const options = this.getHeaders();
        return this.http.delete(`${this.getApiUrl()}/${path}`, options).pipe(
            map((res) => res),
            catchError((err) => this.getError(err))
        );
    }

    public getHeaders() {
        const option = {
            headers: new HttpHeaders({
                Authorization: "Bearer " + this.getStorage("api_token"),
            }),
        };
        return option;
    }

    private getError(err) {
        console.log(err);
        if (err.status === 401) {
            this.router.navigate(["/login"]);
        } else {
            if (err.status === 404) {
                localStorage.clear();
                this.router.navigate(["/login"]);
            }
        }

        return throwError(err.error);
    }

    setStorage(key: string, data: any) {
        localStorage.setItem(key, data ? JSON.stringify(data) : "");
    }
    getStorage(key: string) {
        return JSON.parse(localStorage.getItem(key));
    }
    removeStorage(key: string) {
        localStorage.removeItem(key);
    }

    private getHeadersUpload() {
        const option = {
            headers: new HttpHeaders({
                Authorization: "Bearer " + this.getStorage("api_token"),
            }),
        };
        return option;
    }
}
