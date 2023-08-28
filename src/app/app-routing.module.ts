import { ManagerGuard } from "./../shared/guards/manager.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SettingComponent } from "./setting/setting.component";
import { ManagementLayoutComponent } from "src/shared/layouts/management-layout/management-layout.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
    },
    {
        path: "login",
        pathMatch: "full",
        component: LoginComponent,
    },
    {
        path: "material",
        loadChildren: () =>
            import("../app/materials/materials.module").then(
                (m) => m.MaterialsModule
            ),
        canActivate: [ManagerGuard],
    },
    {
        path: "setting",
        pathMatch: "full",
        component: ManagementLayoutComponent,
        canActivate: [ManagerGuard],
        children: [
            {
                path: "",
                component: SettingComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
