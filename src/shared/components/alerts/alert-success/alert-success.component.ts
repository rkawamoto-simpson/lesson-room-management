import { Component, OnInit, EventEmitter, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: "app-alert-success",
    templateUrl: "./alert-success.component.html",
    styleUrls: ["./alert-success.component.scss"],
})
export class AlertSuccessComponent implements OnInit {
    onFinish = new EventEmitter();
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {}
    ngAfterViewInit(): void {
        document.getElementById("btn-custom").style.background = this.data.color
            ? this.data.color
            : "#3f51b5";
    }
    onConfirmFinish(result) {
        this.onFinish.emit({
            is_confirm: result,
        });
    }
}
