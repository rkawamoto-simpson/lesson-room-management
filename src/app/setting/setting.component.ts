import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { ManagerApiService } from "src/services/manager-api.service";
import { AlertSuccessComponent } from "src/shared/components/alerts/alert-success/alert-success.component";

@Component({
    selector: "app-setting",
    templateUrl: "./setting.component.html",
    styleUrls: ["./setting.component.scss"],
})
export class SettingComponent implements OnInit {
    show = false;
    form: FormGroup;
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private managerApiService: ManagerApiService
    ) {}

    ngOnInit() {
        this.createForm();
        this.detail();
    }

    goToList() {
        this.router.navigate(["teaching-material/list"]);
    }

    goToSetting() {
        this.router.navigate(["/setting"]);
    }
    createForm() {
        this.form = this.formBuilder.group({
            after_time: ["", [Validators.min(1)]],
            before_time: ["", [Validators.min(1)]],
            id: null,
        });
    }
    detail() {
        this.managerApiService.getSetting().subscribe(
            (res) => {
                if (res.data && res.data.id) {
                    this.form.patchValue({
                        after_time: res.data.after_time,
                        before_time: res.data.before_time,
                        id: res.data.id,
                    });
                }
            },
            (err) => {
                this.router.navigate(["/teaching-material/list"]);
            }
        );
    }

    upSert() {
        let data = this.form.value;
        this.managerApiService.upsertSetting(data).subscribe(
            (res) => {
                this.form.patchValue({
                    id: res.data.id,
                });
            },
            (err) => {
                this.dialog
                    .open(AlertSuccessComponent, {
                        data: {
                            title: "エラー",
                            message: err.data,
                            color: "#008cff",
                        },
                    })
                    .afterClosed()
                    .subscribe(() => {});
            }
        );
    }
}
