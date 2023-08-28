import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { RestfulService } from "./restful.service";

@Injectable({
    providedIn: "root",
})
export class ManagerApiService extends RestfulService {
    managementUrl = "";

    constructor(
        public Http: HttpClient,
        public resfulService: RestfulService,
        public router: Router
    ) {
        super(Http, router);
    }

    loginManagement(data) {
        return this.doPost(`user/login`, data);
    }
    getMaterialList(data, per_page: number = 100, page: number = 1) {
        return this.doPost(
            `teaching-material/list?per_page=${per_page}&page=${page}`,
            data
        );
    }
    checkAuth() {
        return this.doGet(`user/check-auth`);
    }
    logoutManagement() {
        return this.doPost(`user/logout`, {});
    }
    getLastIndex() {
        return this.doGet("teaching-material/last-index");
    }
    addTeachingMaterial(formdata: FormData, data) {
        return this.doUpload(
            `teaching-material/add?name_en=${encodeURIComponent(
                data.name_en
            )}&name_ja=${encodeURIComponent(data.name_ja)}&materials_id=${
                data.materials_id
            }&user=${data.user}&category=${data.category}&sub_category=${
                data.sub_category
            }&target_ages=${data.target_ages}&lesson_name=${
                data.lesson_name
            }&levels=${data.levels}&name_ja=${data.name_ja}&name_en=${
                data.name_en
            }`,
            formdata
        );
    }
    getDetailTeachingMaterial(id) {
        return this.doGet(`teaching-material/${id}/detail`);
    }
    editTeachingMaterial(id, formData: FormData, data) {
        return this.doUpload(
            `teaching-material/${id}/update?name_en=${encodeURIComponent(
                data.name_en
            )}&name_ja=${encodeURIComponent(data.name_ja)}&materials_id=${
                data.materials_id
            }&user=${data.user}&category=${data.category}&sub_category=${
                data.sub_category
            }&target_ages=${data.target_ages}&lesson_name=${
                data.lesson_name
            }&levels=${data.levels}&name_ja=${data.name_ja}&name_en=${
                data.name_en
            }`,
            formData
        );
    }
    deleteTeachingMaterial(id) {
        return this.doPost(`teaching-material/${id}/delete`, {});
    }
    getSetting() {
        return this.doGet("room-setting/info");
    }
    upsertSetting(data) {
        return this.doPost("room-setting/upsert", data);
    }
}
