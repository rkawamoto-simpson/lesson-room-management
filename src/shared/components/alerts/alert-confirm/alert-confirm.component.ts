import { Component, Inject, OnInit, EventEmitter } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: "app-alert-confirm",
    templateUrl: "./alert-confirm.component.html",
    styleUrls: ["./alert-confirm.component.scss"],
})
export class AlertConfirmComponent implements OnInit {
    onConfirmReturn = new EventEmitter();
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
    ngOnInit() {}

    ngAfterViewInit(): void {
        document.getElementById("btn-custom").style.background = this.data.color
            ? this.data.color
            : "#3f51b5";
    }
    onReturn(result) {
        this.onConfirmReturn.emit({
            is_confirm: result,
        });
    }
}
