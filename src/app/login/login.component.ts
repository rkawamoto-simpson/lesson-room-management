import { ManagerApiService } from "src/services/manager-api.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { AlertSuccessComponent } from "src/shared/components/alerts/alert-success/alert-success.component";
import { RestfulService } from "src/services/restful.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    formLogin: FormGroup;
    message = "";
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private dialog: MatDialog,
        private managerApiService: ManagerApiService,
        private restFulService: RestfulService
    ) {}

    ngOnInit() {
        this.createForm();
        this.checkAuth();
    }

    checkAuth() {
        let api_token = this.restFulService.getStorage("api_token");
        if (api_token) {
            this.managerApiService.checkAuth().subscribe((res) => {
                if (res.result == 0 && res.data != null) {
                    this.router.navigate(["/teaching-material"]);
                } else {
                    this.restFulService.removeStorage("api_token");
                }
            });
        }
    }

    createForm() {
        const nonWhitespaceRegExp: RegExp = new RegExp("\\S");
        this.formLogin = this.formBuilder.group({
            email: [
                "",
                [
                    Validators.required,
                    Validators.email,
                    Validators.pattern(nonWhitespaceRegExp),
                ],
            ],
            password: [
                "",
                [
                    Validators.required,
                    Validators.maxLength(60),
                    Validators.minLength(8),
                ],
            ],
        });
    }

    login() {
        const dataLogin = this.formLogin.value;

        this.managerApiService.loginManagement(dataLogin).subscribe(
            (res) => {
                if (res.result == 0) {
                    this.managerApiService.setStorage(
                        "api_token",
                        res.data.token
                    );
                    this.router.navigate(["/teaching-material"]);
                }
            },
            (err) => {
                console.log(err);
                if (err.total == 0) {
                    this.message = "";
                    this.dialog
                        .open(AlertSuccessComponent, {
                            data: {
                                message: "ネットワークが接続されていません。",
                                color: "#3f51b5",
                            },
                        })
                        .afterClosed()
                        .subscribe(() => {});
                } else {
                    this.message = err.message + "err";
                }
            }
        );
    }
}
