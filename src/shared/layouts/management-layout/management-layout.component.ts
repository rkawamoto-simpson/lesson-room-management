import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ManagerApiService } from "src/services/manager-api.service";
import { RestfulService } from "src/services/restful.service";

@Component({
    selector: "app-management-layout",
    templateUrl: "./management-layout.component.html",
    styleUrls: ["./management-layout.component.scss"],
})
export class ManagementLayoutComponent implements OnInit {
    manager_name: any;
    show = false;
    title = "";
    constructor(
        private router: Router,
        private managerApiService: ManagerApiService,
        private restFulService: RestfulService
    ) {}
    public innerWidth: any;
    @HostListener("window:resize", ["$event"])
    onResize(event) {
        this.innerWidth = window.innerWidth;
    }

    ngOnDestroy(): void {}

    ngOnInit() {
        this.innerWidth = window.innerWidth;
        this.manager_name = this.restFulService.getStorage("manager_name");

        if (window.location.href.indexOf("setting") > 0) {
            this.title = "設定";
        } else {
            this.title = "教材一覧";
        }
    }

    logout() {
        this.managerApiService.logoutManagement().subscribe((res) => {
            this.restFulService.removeStorage("api_token");
            this.router.navigate(["/login"]);
        });
    }

    goTo() {
        if (window.location.href.indexOf("setting") > 0) {
            this.goToSetting();
        } else {
            this.goToList();
        }
    }

    goToList() {
        this.router.navigate(["teaching-material/list"]);
    }

    goToSetting() {
        this.router.navigate(["/setting"]);
    }
}
