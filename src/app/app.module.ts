import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavMenuComponent } from "./components/nav-menu/nav-menu.component";
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
    MatBottomSheetModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatProgressBarModule
} from "@angular/material";
import { PerfilComponent } from "./pages/perfil/perfil.component";
import { AppRoutingModule } from ".//app-routing.module";
import { MyTableComponent } from "./components/my-table/my-table.component";
import { UsersComponent } from "./pages/users/users.component";
import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HomeComponent } from "./pages/home/home.component";
import { ReportComponent } from "./pages/report/report.component";
import {
    BottomSheetComponent,
    BottomSheetShow
} from "./components/bottom-sheet/bottom-sheet.component";
import { FirebaseConfig } from "./../environments/firebase.config";
import { AngularFireModule } from "angularfire2/index";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuth } from "angularfire2/auth";
import { AuthGuard } from "./services/auth/auth.guard";
import { AuthService } from "./services/auth/auth.service";
import { CrudService } from "./services/crud/crud.service";
import { FileService } from "./services/file/file.service";
import { UsersFormComponent } from "./pages/users-form/users-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
    DeleteDialogComponent,
    DeleteDialogShow
} from "./components/delete-dialog/delete-dialog.component";
import { ReportFormComponent } from "./pages/report-form/report-form.component";
import { ReportViewComponent } from "./pages/report-view/report-view.component";
import { StatComponent } from "./components/stat/stat.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { KeysPipe } from './pipes/keys.pipe';

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
        BottomSheetShow,
        UsersFormComponent,
        DeleteDialogComponent,
        DeleteDialogShow,
        ReportFormComponent,
        ReportViewComponent,
        StatComponent,
        KeysPipe
    ],
    imports: [
        FlexLayoutModule,
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
        MatTooltipModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatExpansionModule,
        MatProgressBarModule,
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(FirebaseConfig)
    ],
    providers: [
        AuthGuard,
        AuthService,
        AngularFireAuth,
        CrudService,
        FileService
    ],
    entryComponents: [
        BottomSheetComponent,
        BottomSheetShow,
        DeleteDialogComponent,
        DeleteDialogShow
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
