import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PerfilComponent } from "./pages/perfil/perfil.component";
import { UsersComponent } from "./pages/users/users.component";
import { UsersFormComponent } from "./pages/users-form/users-form.component";
import { ReportComponent } from "./pages/report/report.component";
import { ReportFormComponent } from "./pages/report-form/report-form.component";
import { ReportViewComponent } from "./pages/report-view/report-view.component";
import { HomeComponent } from "./pages/home/home.component";
import { LockComponent } from "./pages/lock/lock.component";
import { AuthGuard } from "./services/auth/auth.guard";

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from "./layouts/blank/blank.component";

const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    {
        path: "",
        component: FullComponent,
        canActivate: [AuthGuard],
        children: [
            { path: "home", component: HomeComponent },
            { path: "perfil", component: PerfilComponent },
            { path: "users", component: UsersComponent },
            { path: "users-form", component: UsersFormComponent },
            { path: "report", component: ReportComponent },
            { path: "report-view", component: ReportViewComponent },
            { path: "report-form", component: ReportFormComponent }
        ]
    },
    {
        path: "",
        component: BlankComponent,
        children: [
            {
                path: "lock",
                component: LockComponent
            }
        ]
    }
];
@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
