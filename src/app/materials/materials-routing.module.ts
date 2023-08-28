import { MaterialAddComponent } from "./material-add/material-add.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MaterialEditComponent } from "./material-edit/material-edit.component";
import { MaterialListComponent } from "./material-list/material-list.component";
import { ManagementLayoutComponent } from "src/shared/layouts/management-layout/management-layout.component";

const routes: Routes = [
    {
        path: "",
        component: ManagementLayoutComponent,
        children: [
            {
                path: "teaching-material",
                pathMatch: "full",
                component: MaterialListComponent,
            },
            {
                path: "teaching-material/list",
                pathMatch: "full",
                component: MaterialListComponent,
            },
            {
                path: "teaching-material/add",
                pathMatch: "full",
                component: MaterialAddComponent,
            },
            {
                path: "teaching-material/:id/edit",
                pathMatch: "full",
                component: MaterialEditComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MaterialsRoutingModule {}
