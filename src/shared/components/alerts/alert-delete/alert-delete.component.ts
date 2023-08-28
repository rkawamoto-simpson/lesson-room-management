import { Component, Inject, OnInit, EventEmitter } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: "app-alert-delete",
    templateUrl: "./alert-delete.component.html",
    styleUrls: ["./alert-delete.component.scss"],
})
export class AlertDeleteComponent implements OnInit {
    onConfirmReturn = new EventEmitter();
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(MAT_DIALOG_DATA) public color: any = "#3f51b5"
    ) {}
    ngOnInit() {}

    onReturn(result) {
        this.onConfirmReturn.emit({
            is_confirm: result,
        });
    }
}
