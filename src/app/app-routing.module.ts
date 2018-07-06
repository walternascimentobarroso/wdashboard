import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersFormComponent } from './pages/users-form/users-form.component';
import { ReportComponent } from './pages/report/report.component';
import { ReportFormComponent } from './pages/report-form/report-form.component';
import { ReportViewComponent } from './pages/report-view/report-view.component';
import { HomeComponent } from './pages/home/home.component';
import { LockComponent } from './pages/lock/lock.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'users-form', component: UsersFormComponent, canActivate: [AuthGuard] },
    { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
    { path: 'report-view', component: ReportViewComponent, canActivate: [AuthGuard] },
    { path: 'report-form', component: ReportFormComponent, canActivate: [AuthGuard] }
    { path: 'lock', component: LockComponent, canActivate: [AuthGuard] }
];
@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
