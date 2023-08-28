import { ManagerApiService } from "src/services/manager-api.service";
import { AlertSuccessComponent } from "src/shared/components/alerts/alert-success/alert-success.component";
import { MatDialog, PageEvent } from "@angular/material";
import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { RestfulService } from "src/services/restful.service";

@Component({
    selector: "app-material-list",
    templateUrl: "./material-list.component.html",
    styleUrls: ["./material-list.component.scss"],
})
export class MaterialListComponent implements OnInit {
    displayedColumns: string[] = [
        "id",
        "user",
        "category",
        "sub_category",
        "name",
        "lesson_name",
        "target_age",
        "level",
        "created_at",
        "updated_at",
        "edit",
    ];
    show = false;
    login_id = "";
    keyword = "";
    created_at_begin = "";
    created_at_end = "";
    updated_at_begin = "";
    updated_at_end = "";
    user = "";
    category = "";
    target_age = "";
    level = "";
    language_name;
    orderBy = "";
    method = "";
    dataSource = new MatTableDataSource();
    length = 100;
    pageSize = 100;
    pageIndex = 0;
    pageSizeOptions = [50, 100, 200, 300];
    showFirstLastButtons = true;
    list = [];
    public innerWidth: any;

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

    @HostListener("window:resize", ["$event"])
    onResize(event) {
        this.innerWidth = window.innerWidth;
    }

    handlePageEvent(event: PageEvent) {
        this.length = event.length;
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.getList();
    }
    constructor(
        private router: Router,
        private dialog: MatDialog,
        private managerApiService: ManagerApiService,
        private restFulService: RestfulService
    ) {}

    ngOnInit() {
        this.innerWidth = window.innerWidth;
        this.getList();
    }

    changeCreatedDate(event: any) {
        if (event.target.value) {
            this.created_at_begin = this.parseDateToStringYMD(
                new Date(event.target.value.begin)
            );
            this.created_at_end = this.parseDateToStringYMD(
                new Date(event.target.value.end)
            );
        } else {
            this.created_at_begin = "";
            this.created_at_end = "";
        }
    }

    changeUpdatedDate(event: any) {
        if (event.target.value) {
            this.updated_at_begin = this.parseDateToStringYMD(
                new Date(event.target.value.begin)
            );
            this.updated_at_end = this.parseDateToStringYMD(
                new Date(event.target.value.end)
            );
        } else {
            this.updated_at_begin = "";
            this.updated_at_end = "";
        }
    }

    parseDateToStringYMD(d: Date) {
        return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    }

    getList() {
        let page = this.pageIndex + 1;
        let data = {
            user: this.user,
            category: this.category,
            level: this.level ? this.level : "",
            target_age: this.target_age ? this.target_age : "",
            created_at_begin: this.created_at_begin,
            created_at_end: this.created_at_end,
            updated_at_begin: this.updated_at_begin,
            updated_at_end: this.updated_at_end,
            language_name: this.language_name,
            keyword: this.keyword,
            orderBy: this.orderBy ? this.orderBy : "",
            sort: this.method ? this.method : "",
        };
        var that: any;
        that = this;
        this.managerApiService
            .getMaterialList(data, this.pageSize, page)
            .subscribe((res) => {
                this.length = res.data.total;
                this.list = res.data.data;

                res.data.data.forEach((e) => {
                    e.levels = [];
                    e.material_levels.forEach(function (childEntry) {
                        if (that.levels[childEntry["level"] - 1])
                            e.levels.push(
                                that.levels[childEntry["level"] - 1]["name"]
                            );
                    });

                    e.target_ages = [];
                    e.material_target_ages.forEach(function (childEntry) {
                        if (that.target_ages[childEntry["target_age"] - 1])
                            e.target_ages.push(
                                that.target_ages[childEntry["target_age"] - 1][
                                    "name"
                                ]
                            );
                    });

                    if (that.users[e.users - 1])
                        e.users = that.users[e.users - 1]["name"];
                    if (that.categories[e.category - 1])
                        e.category = that.categories[e.category - 1]["name"];
                });
                this.dataSource = new MatTableDataSource(res.data.data);
            });
    }
    goToCreate() {
        this.router.navigate(["teaching-material/add"]);
    }

    search() {
        this.pageIndex = 0;
        this.getList();
    }

    detail(id) {
        this.router.navigate(["/teaching-material/" + id + "/edit"]);
    }

    sort(event, item) {
        console.log(item);
        let sort = "";
        this.removeAllIcon();
        event.target.classList.add("icon");
        if (!event.target.classList.contains("icon-animation")) {
            event.target.classList.add("icon-animation");
            sort = "desc";
        } else {
            event.target.classList.remove("icon-animation");
            sort = "asc";
        }
        this.orderBy = item;
        this.method = sort;
        this.getList();
    }

    removeAllIcon() {
        const headers = document.querySelectorAll("th label");
        for (var i = 0; i < headers.length; i++) {
            headers[i].classList.remove("icon");
        }
    }

    changeLanguageName(e: any) {
        this.language_name = e.value;
        this.search();
    }
}
