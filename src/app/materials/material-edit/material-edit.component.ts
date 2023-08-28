import { ManagerApiService } from "src/services/manager-api.service";
import { AlertSuccessComponent } from "./../../../shared/components/alerts/alert-success/alert-success.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { AlertDeleteComponent } from "src/shared/components/alerts/alert-delete/alert-delete.component";

@Component({
    selector: "app-material-edit",
    templateUrl: "./material-edit.component.html",
    styleUrls: ["./material-edit.component.scss"],
})
export class MaterialEditComponent implements OnInit {
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
        private managerApiService: ManagerApiService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.createForm();
        this.id = this.activatedRoute.snapshot.paramMap.get("id");
        this.detail();
    }

    createForm() {
        this.form = this.formBuilder.group({
            file: ["", []],
            materials_id: "",
            user: ["", Validators.required],
            category: ["", Validators.required],
            sub_category: [],
            target_ages: ["", Validators.required],
            lesson_name: ["", [Validators.required, Validators.maxLength(255)]],
            levels: ["", Validators.required],
            name_ja: ["", [Validators.required, Validators.maxLength(255)]],
            name_en: ["", [Validators.required, Validators.maxLength(255)]],
        });
    }
    edit() {
        let data = this.form.value;
        data.sub_category = data.sub_category ? data.sub_category : "";
        let formData: FormData = new FormData();
        if (this.fileName) {
            formData.append("file", this.file);
        }
        this.managerApiService
            .editTeachingMaterial(this.id, formData, data)
            .subscribe(
                (res) => {
                    this.router.navigate(["/teaching-material/list"]);
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

    detail() {
        var that: any;
        that = this;
        this.managerApiService.getDetailTeachingMaterial(this.id).subscribe(
            (res) => {
                res.data.selected_level = [];
                res.data.material_levels.forEach(function (e) {
                    res.data.selected_level.push(e["level"]);
                });

                res.data.selected_target_age = [];
                res.data.material_target_ages.forEach(function (e) {
                    res.data.selected_target_age.push(e["target_age"]);
                });

                this.form.patchValue({
                    name_ja: res.data.name_ja,
                    name_en: res.data.name_en,
                    materials_id: res.data.materials_id
                        .toString()
                        .padStart(4, "0"),
                    user: res.data.users,
                    category: res.data.category,
                    sub_category: res.data.sub_category,
                    target_ages: res.data.selected_target_age,
                    lesson_name: res.data.lesson_name,
                    levels: res.data.selected_level,
                });
                console.log(res.data);
            },
            (err) => {
                this.router.navigate(["/teaching-material/list"]);
            }
        );
    }

    remove() {
        this.dialog
            .open(AlertDeleteComponent, {
                data: {
                    title: "教材削除",
                    message: `教材を削除します。
                            よろしいですか？
                `,
                    color: "#008cff",
                },
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.managerApiService
                        .deleteTeachingMaterial(this.id)
                        .subscribe(
                            (res) => {
                                this.router.navigate([
                                    "/teaching-material/list",
                                ]);
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
            });
    }
}
