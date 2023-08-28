import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-alert-api",
    templateUrl: "./alert-api.component.html",
    styleUrls: ["./alert-api.component.scss"],
})
export class AlertApiComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
    ngOnInit() {}
}
