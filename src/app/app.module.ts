import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { LayoutModule } from "@angular/cdk/layout";
import {
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatBottomSheetModule
} from "@angular/material";
import { PerfilComponent } from "./pages/perfil/perfil.component";
import { AppRoutingModule } from ".//app-routing.module";
import { MyTableComponent } from "./my-table/my-table.component";
import { UsersComponent } from "./pages/users/users.component";
import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./pages/home/home.component";
import { ReportComponent } from "./pages/report/report.component";
import {
    BottomSheetComponent,
    BottomSheetShow
} from "./bottom-sheet/bottom-sheet.component";

import { FirebaseConfig } from "./../environments/firebase.config";
import { AngularFireModule } from "angularfire2/index";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthGuard } from './services/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        PerfilComponent,
        MyTableComponent,
        UsersComponent,
        LoginComponent,
        DashboardComponent,
        HomeComponent,
        ReportComponent,
        BottomSheetComponent,
        BottomSheetShow
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        AppRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatGridListModule,
        MatBottomSheetModule,
        AngularFireModule.initializeApp(FirebaseConfig)
    ],
    providers: [AuthGuard, AuthService, AngularFireAuth],
    entryComponents: [BottomSheetComponent, BottomSheetShow],
    bootstrap: [AppComponent]
})
export class AppModule {}
