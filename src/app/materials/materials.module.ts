import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MaterialsRoutingModule } from "./materials-routing.module";
import { MaterialAddComponent } from "./material-add/material-add.component";
import { SharedModule } from "src/shared/shared.module";

import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatSelectModule,
    MatRadioModule,
    MatSortModule,
} from "@angular/material";
import {
    MAT_DATE_FORMATS,
    DateAdapter,
    SatDatepickerModule,
    SatNativeDateModule,
} from "saturn-datepicker";
import { AppDateAdapter } from "./date.adapter";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialEditComponent } from "./material-edit/material-edit.component";
import { MaterialListComponent } from "./material-list/material-list.component";

export const MY_FORMATS = {
    parse: {
        dateInput: "YYYY-MM-DD",
    },
    display: {
        dateInput: "YYYY-MM-DD",
        monthYearLabel: "MMM YYYY",
        dateA11yLabel: "LL",
        monthYearA11yLabel: "MMMM YYYY",
    },
};

@NgModule({
    declarations: [
        MaterialAddComponent,
        MaterialEditComponent,
        MaterialListComponent,
    ],
    imports: [
        CommonModule,
        MaterialsRoutingModule,
        SharedModule,
        MatGridListModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatIconModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatTableModule,
        MatToolbarModule,
        MatCardModule,
        MatTooltipModule,
        MatSelectModule,
        SatDatepickerModule,
        SatNativeDateModule,
        MatRadioModule,
    ],
    providers: [
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class MaterialsModule {}
