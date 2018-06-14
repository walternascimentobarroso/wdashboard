import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { UsersComponent } from './pages/users/users.component';
import { ReportComponent } from './pages/report/report.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'users', component: UsersComponent },
    { path: 'report', component: ReportComponent },
    { path: 'login', component: LoginComponent }
];
@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
