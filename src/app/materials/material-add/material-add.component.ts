import { ManagerApiService } from "src/services/manager-api.service";
import { AlertSuccessComponent } from "./../../../shared/components/alerts/alert-success/alert-success.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { AlertConfirmComponent } from "src/shared/components/alerts/alert-confirm/alert-confirm.component";

@Component({
    selector: "app-material-add",
    templateUrl: "./material-add.component.html",
    styleUrls: ["./material-add.component.scss"],
})
export class MaterialAddComponent implements OnInit {
    form: FormGroup;
    hide: any = true;
    fileName = "";
    id = "0001";
    file: File;
    users = [
        { id: 1, name: "生徒用教材" },
        { id: 2, name: "講師用教材" },
        { id: 3, name: "全共通" },
        { id: 4, name: "登録なし" },
    ];
    categories = [
        { id: 1, name: "体験レッスン" },
        { id: 2, name: "日常英会話" },
        { id: 3, name: "ビジネス英会話" },
        { id: 4, name: "時事／ニュース英会話" },
        { id: 5, name: "映画／ドラマ英会話" },
        { id: 6, name: "旅行英会話" },
        { id: 7, name: "英検対策" },
        { id: 8, name: "全共通" },
        { id: 9, name: "登録なし" },
    ];
    target_ages = [
        { id: 1, name: "キッズ用" },
        { id: 2, name: "大人用" },
        { id: 3, name: "学生用" },
        { id: 4, name: "全共通" },
        { id: 5, name: "登録なし" },
    ];
    levels = [
        { id: 1, name: "入門" },
        { id: 2, name: "入門～初級" },
        { id: 3, name: "初級" },
        { id: 4, name: "初級～中級" },
        { id: 5, name: "中級" },
        { id: 6, name: "中級～上級" },
        { id: 7, name: "上級" },
        { id: 8, name: "全共通" },
        { id: 9, name: "登録なし" },
    ];

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private managerApiService: ManagerApiService
    ) {}

    ngOnInit() {
        this.createForm();
        this.managerApiService.getLastIndex().subscribe((res) => {
            this.form.patchValue({
                materials_id: res.data.toString().padStart(4, "0"),
            });
        });
    }

    createForm() {
        this.form = this.formBuilder.group({
            materials_id: "0001",
            user: ["", Validators.required],
            category: ["", Validators.required],
            sub_category: [],
            target_ages: ["", Validators.required],
            lesson_name: ["", [Validators.required, Validators.maxLength(255)]],
            levels: ["", Validators.required],
            name_ja: ["", [Validators.required, Validators.maxLength(255)]],
            name_en: ["", [Validators.required, Validators.maxLength(255)]],
            file: ["", [Validators.required]],
        });
    }
    create() {
        let data = this.form.value;
        data.sub_category = data.sub_category ? data.sub_category : "";
        let formData: FormData = new FormData();
        if (this.fileName) {
            formData.append("file", this.file);
        }
        this.managerApiService.addTeachingMaterial(formData, data).subscribe(
            (res) => {
                this.router.navigate(["/teaching-material/list"]);
            },
            (err: any) => {
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

    onFileChange(event: any) {
        if (event.target.files[0]) {
            this.file = event.target.files[0];
            this.fileName = event.target.files[0].name
                ? event.target.files[0].name
                : "";
        } else {
            this.file = null;
            this.fileName = "";
        }
    }
}
