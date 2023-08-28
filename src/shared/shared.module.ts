import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaginationComponent } from "./components/pagination/pagination.component";
import {
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatTooltipModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ManagementLayoutComponent } from "./layouts/management-layout/management-layout.component";
import { AlertApiComponent } from "./components/alert-api/alert-api.component";
import { AlertDeleteComponent } from "./components/alerts/alert-delete/alert-delete.component";
import { AlertConfirmComponent } from "./components/alerts/alert-confirm/alert-confirm.component";
import { AlertSuccessComponent } from "./components/alerts/alert-success/alert-success.component";
import { AlertErrorComponent } from "./components/alerts/alert-error/alert-error.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

@NgModule({
    declarations: [
        PaginationComponent,
        ManagementLayoutComponent,
        AlertApiComponent,
        AlertDeleteComponent,
        AlertConfirmComponent,
        AlertSuccessComponent,
        AlertErrorComponent,
        PageNotFoundComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatNativeDateModule,
        MatListModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatCardModule,
        MatTooltipModule,
        MatMenuModule,
    ],
    exports: [
        PaginationComponent,
        AlertDeleteComponent,
        AlertConfirmComponent,
        AlertSuccessComponent,
        AlertErrorComponent,
    ],
    entryComponents: [
        AlertDeleteComponent,
        AlertConfirmComponent,
        AlertSuccessComponent,
        AlertErrorComponent,
    ],
})
export class SharedModule {}
