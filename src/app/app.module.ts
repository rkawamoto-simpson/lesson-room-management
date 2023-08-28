import { MatIconModule } from "@angular/material/icon";
import { MaterialsModule } from "./materials/materials.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./login/login.component";
import { CommonModule } from "@angular/common";
import {
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatTooltipModule,
} from "@angular/material";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SettingComponent } from "./setting/setting.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthenticationInterceptor } from "src/services/authentication-interceptor.service";
@NgModule({
    declarations: [AppComponent, LoginComponent, SettingComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CommonModule,
        MatGridListModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MaterialsModule,
        MatIconModule,
        MatCardModule,
        MatTooltipModule,
        HttpClientModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
